import React, { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import DashboardLayout from "../../../layouts/DashboardLayout";
import useSWR from "swr";
import { attendance, record, user } from "../../../interface";
import { AiOutlinePlus } from "react-icons/ai";
import CreateRecord from "../../../components/CreateRecord";

import Record from "../../../components/Record";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import Pagination from "../../../components/Pagination";
import DeleteAttendance from "../../../components/DeleteAttendance";
import Button from "../../../components/Button";
import ExportTableData from "../../../components/ExportTableData";

const PrivatRoute = dynamic(() => import("../../../components/PrivatRoute"), {
  ssr: false,
});

const AttendancePage = () => {
  const [itemsPerTable, setItemsPerTable] = useState<number>(10);
  const [participants, setParticipants] = useState<user[]>([]);
  const [participantsPerTable, setParticipantsPerTable] = useState<user[]>([]);
  const [tablePaginationInfo, setTablePaginationInfo] = useState<string>("");
  const [tableNumber, setTableNumber] = useState<number>(1);
  const [tableOffset, setTableOffset] = useState<number>(0);
  const [records, setRecords] = useState<record[]>([]);
  const [
    participantsAttendancePercentage,
    setParticipantsAttendancePercentage,
  ] = useState<Map<string, number>>(new Map());
  const [showCreateRecord, setShowCreateRecord] = useState<Boolean>(false);
  const [hideOnExport, setHideOnExport] = useState<boolean>(false);

  const tableRef = useRef<HTMLTableElement>(null);

  const router = useRouter();

  const { id: attendanceId } = router.query;

  const { data: attendance, error } = useSWR<attendance>(
    attendanceId ? `/api/attendance/${attendanceId}` : null
  );

  const convertObjectToMap = (record: record) => {
    const participants = new Map<string, string>(
      Object.entries(record.participants!)
    );
    return { ...record, participants };
  };

  const calculateParticipantAttendancePercentage = useCallback(() => {
    participants.map((participant) => {
      let total = 0;
      records.forEach((record) => {
        if (record.participants?.has(participant.fullName)) {
          total += 1;
        }
        return total;
      });
      setParticipantsAttendancePercentage((prev) => {
        const copy = new Map(prev);
        copy.set(
          participant.fullName,
          Number(((total / records.length) * 100).toFixed(2))
        );
        return copy;
      });
    });
  }, [participants, records]);

  useEffect(() => {
    if (attendance) {
      console.log(attendance);
      setRecords(
        attendance.records!.map((record, imdex) => {
          return convertObjectToMap(record);
        })
      );
      setParticipants(attendance.participants!);
    }
  }, [attendance]);

  useEffect(() => {
    if (participants && records) {
      calculateParticipantAttendancePercentage();
    }
  }, [participants, records, calculateParticipantAttendancePercentage]);

  useEffect(() => {
    let endOffset = tableOffset + itemsPerTable;
    if (itemsPerTable > participants.length - tableOffset) {
      endOffset = tableOffset + participants.length - tableOffset;
    }
    setParticipantsPerTable(participants.slice(tableOffset, endOffset));
    setTablePaginationInfo(
      `Showing ${tableOffset + 1} ${
        endOffset > tableOffset + 1 ? `to ${endOffset}` : ""
      } of  ${participants.length} ${
        participants.length > 1 ? "entries" : "entry"
      }`
    );
  }, [tableOffset, participants, itemsPerTable]);

  const hideCreateRecord = () => {
    setShowCreateRecord(false);
  };

  const createNewRecord = async (title: string) => {
    const response = await axios.post("/api/record", {
      title,
      attendanceId,
    });

    if (response.data) {
      console.log(response.data);
      setRecords((prevRecords) => [
        ...prevRecords,
        convertObjectToMap(response.data),
      ]);
      setShowCreateRecord(false);
    }
  };

  const toggleRecordStatus = async (id: string, active: string) => {
    const response = await axios.patch(`/api/record/${id}`, {
      active,
    });
    if (response.status === 200) {
      setRecords((prevRecords) => {
        let newRecords = prevRecords.map((record) => {
          if (record._id === id) {
            record.active = active === "true" ? true : false;
          }
          return record;
        });
        return newRecords;
      });
    }
  };

  const addParticipantsToRecord = async (
    recordId: string,
    participant: user
  ) => {
    const response = await axios.patch(`/api/record/${recordId}`, {
      participantId: participant._id,
      participantFullName: participant.fullName,
    });
    if (response.status === 200) {
      setRecords((prevRecords) => {
        let newRecords = prevRecords.map((record) => {
          if (record._id === recordId) {
            record = convertObjectToMap(response.data);
          }
          return record;
        });
        return newRecords;
      });
      if (!participants.find((user) => user._id === participant._id)) {
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          participant,
        ]);
      }
    }
  };

  const deleteRecord = async (recordId: string) => {
    const response = await axios.delete(`/api/record/${recordId}`);
    if (response.status === 200) {
      setRecords((prevRecords) => {
        let upDatedRecords = prevRecords.filter(
          (record) => record._id !== recordId
        );
        return upDatedRecords;
      });
    }
  };

  const deleteAttendace = async () => {
    const response = await axios.delete(`/api/attendance/${attendanceId}`);
    if (response.status === 200) {
      router.push("/dashboard");
    }
  };

  return (
    <PrivatRoute>
      <DashboardLayout>
        <AnimatePresence initial={false} mode="wait">
          {showCreateRecord && (
            <CreateRecord
              hideCreateRecord={hideCreateRecord}
              createNewRecord={createNewRecord}
            />
          )}
        </AnimatePresence>

        <div className="block px-4 py-8 shadow-2xl bg-element-bg  dark:bg-dark-element-bg rounded-lg text-font-color dark:text-dark-font-color">
          <div className=" flex flex-col items-start md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0 md:gap-4">
            <h1 className={` text-2xl`}>{attendance?.title}</h1>
            <div className=" flex items-center space-x-4">
              <ExportTableData
                setHideOnExport={setHideOnExport}
                title={attendance?.title}
                tableRef={tableRef.current}
              />
              <Button size="md" onClick={() => setShowCreateRecord(true)}>
                <AiOutlinePlus size={20} />
                <span className="ml-2">New Record</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:gap-4 md:items-center">
            <div className="flex items-center space-x-2">
              <p>show</p>
              <input
                className=" border-none py-3 pl-4 rounded-sm outline-none bg-body-bg dark:bg-dark-body-bg w-full"
                type="number"
                defaultValue={itemsPerTable}
                onChange={(e) => {
                  if (Number(e.target.value) > 0) {
                    setItemsPerTable(Number(e.target.value));
                  }
                }}
              />
              <p>entries</p>
            </div>
            <div className=" flex items-center bg-body-bg  dark:bg-dark-body-bg rounded-lg [&>*]:py-3">
              <input
                type="text"
                placeholder="search"
                className=" bg-transparent outline-none border-none px-4"
                onChange={(e) =>
                  setParticipants(
                    attendance!.participants!.filter((participant) =>
                      participant.fullName.includes(e.target.value)
                    )
                  )
                }
              />
            </div>
          </div>

          <div className="w-full min-h-full overflow-x-auto pt-6">
            <table
              ref={tableRef}
              className=" table-auto border-collapse w-full min-h-[150px] border-b-2 dark:border-gray-600"
            >
              <thead className=" border-b-2 dark:border-gray-600">
                <tr className=" [&>th]:min-w-[200px] w-full [&>th]:text-left ">
                  <th className=" px-4 whitespace-nowrap py-4">Name</th>
                  <th className=" px-4 whitespace-nowrap py-4">email</th>
                  {records.length ? (
                    records.map((record, index) => (
                      <Record
                        key={record._id}
                        record={record}
                        hideOnExport={hideOnExport}
                        toggleRecordStatus={toggleRecordStatus}
                        addParticipantsToRecord={addParticipantsToRecord}
                        deleteRecord={deleteRecord}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody className=" [&>tr:nth-child(odd)]:bg-body-bg [&>tr:nth-child(odd)]:dark:bg-dark-body-bg">
                {participantsPerTable.length ? (
                  participantsPerTable.map((participant, index) => (
                    <tr key={participant._id}>
                      <td className="whitespace-nowrap p-2 px-4">
                        {participant.fullName}
                      </td>
                      <td className="whitespace-nowrap p-3 px-4">
                        {participant.email}
                      </td>

                      {records.map((record, index) => {
                        return (
                          <td
                            key={record._id + participant._id}
                            className="whitespace-nowrap p-2 px-4 text-center"
                          >
                            {record.participants?.has(participant.fullName)
                              ? record.participants.get(participant.fullName)
                              : "absent"}
                          </td>
                        );
                      })}
                      <td className="whitespace-nowrap p-2">
                        {`${
                          participantsAttendancePercentage.get(
                            participant.fullName
                          )
                            ? participantsAttendancePercentage.get(
                                participant.fullName
                              )
                            : 0
                        } %`}
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
          <div className=" flex flex-col md:flex-row md:items-center md:justify-between py-10 space-y-4 md:space-y-0 md:gap-4">
            {!participants.length ? (
              <p className=" mx-auto text-center">No participant added yet</p>
            ) : (
              <></>
            )}
            {tablePaginationInfo && participants.length ? (
              <p className=" w-full font-bold min-w-fit">
                {tablePaginationInfo}
              </p>
            ) : (
              <></>
            )}
            {participants.length ? (
              <Pagination
                participants={participants}
                itemsPerTable={itemsPerTable}
                tableNumber={tableNumber}
                setTableNumber={setTableNumber}
                setTableOffset={setTableOffset}
              />
            ) : (
              <></>
            )}
          </div>
          <DeleteAttendance deleteAttendance={deleteAttendace} />
        </div>
      </DashboardLayout>
    </PrivatRoute>
  );
};

export default AttendancePage;
