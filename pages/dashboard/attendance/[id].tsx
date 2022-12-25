import React, { useEffect, useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import DashboardLayout from "../../../layouts/DashboardLayout";
import useSWR from "swr";
import { attendance } from "../../../interface";
import CreateRecord from "../../../components/CreateRecord";

import Record from "../../../components/Record";
import axios from "axios";
import Pagination from "../../../components/Pagination";
import DeleteAttendance from "../../../components/DeleteAttendance";
import ExportTableData from "../../../components/ExportTableData";
import useLocation from "../../../hooks/useLocation";
import useAttendanceStore from "../../../store";
import TableEntryControl from "../../../components/TableEntryControl";
import SearchAttendanceTable from "../../../components/SearchAttendanceTable";
import useURL from "../../../hooks/useURL";
import Seo from "../../../components/Seo";

const PrivatRoute = dynamic(() => import("../../../components/PrivatRoute"), {
  ssr: false,
});

const AttendancePage = () => {
  const [itemsPerTable, setItemsPerTable] = useState<number>(10);
  const [hideOnExport, setHideOnExport] = useState<boolean>(false);

  const tableRef = useRef<HTMLTableElement>(null);

  const router = useRouter();

  const { id: attendanceId } = router.query;
  const { latitude, longitude } = useLocation();
  const { data: attendance, error } = useSWR<attendance>(
    attendanceId ? `/api/attendance/${attendanceId}` : null
  );

  const records = useAttendanceStore((store) => store.records);
  const participants = useAttendanceStore((store) => store.participants);
  const allParticipants = useAttendanceStore((store) => store.allParticipants);
  const setRecords = useAttendanceStore((store) => store.setRecords);
  const setAllParticipants = useAttendanceStore(
    (store) => store.setAllParticipants
  );

  const url = useURL();

  const calculateParticipantAttendancePercentage = useMemo(() => {
    let partcipantsPercentage: Map<string, number> = new Map();
    allParticipants.map((participant) => {
      let total = 0;
      records.forEach((record) => {
        if (record.participants?.has(participant.fullName)) {
          total += 1;
        }
        return total;
      });
      const percentage = Number(((total / records.length) * 100).toFixed(2));
      return partcipantsPercentage.set(participant.fullName, percentage);
    });
    return partcipantsPercentage;
  }, [allParticipants, records]);

  const updateUserLocation = async (longitude: number, latitude: number) => {
    const userLocation = { latitude, longitude };
    await axios.patch(`/api/attendance/${attendanceId}`, { userLocation });
  };

  useEffect(() => {
    if (latitude && longitude && attendanceId) {
      updateUserLocation(longitude, latitude!);
    }
  }, [latitude, longitude, attendanceId]);

  useEffect(() => {
    if (attendance) {
      console.log(attendance);

      setAllParticipants(attendance.participants!);
      setRecords(attendance.records!);
    }
  }, [attendance]);

  const deleteAttendace = async () => {
    const response = await axios.delete(`/api/attendance/${attendanceId}`);
    if (response.status === 200) {
      router.push("/dashboard");
    }
  };

  return (
    <PrivatRoute>
      <Seo
        url={url}
        seo={{
          title: attendance?.title!,
          metaDesc: attendance?.description!,
          metaKeywords: "",
        }}
        noindex={true}
        nofollow={true}
      />
      <DashboardLayout>
        <div className="block px-4 py-8 shadow-2xl bg-element-bg  dark:bg-dark-element-bg rounded-lg text-font-color dark:text-dark-font-color">
          <div className=" flex flex-col items-start md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0 md:gap-4">
            <h1 className={` text-2xl`}>{attendance?.title}</h1>
            <div className=" flex items-center space-x-4">
              <ExportTableData
                setHideOnExport={setHideOnExport}
                title={attendance?.title}
                tableRef={tableRef.current}
              />
              <CreateRecord attendanceId={`${attendanceId}`} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:gap-4 md:items-center">
            <TableEntryControl
              itemsPerTable={itemsPerTable}
              setItemsPerTable={setItemsPerTable}
            />
            <SearchAttendanceTable participants={attendance?.participants!} />
          </div>

          <div className="w-full min-h-full overflow-x-auto pt-6">
            <table
              ref={tableRef}
              className=" table-auto border-collapse w-full min-h-[150px] border-b-2 dark:border-gray-600"
            >
              <thead className=" border-b-2 dark:border-gray-600">
                <tr className=" w-full [&>th]:text-left ">
                  <th className="px-4 w-8 whitespace-nowrap py-4">S/N</th>
                  <th className=" px-4 whitespace-nowrap py-4 ">Name</th>
                  <th className=" px-4 whitespace-nowrap py-4 ">email</th>
                  {records.length ? (
                    records.map((record, index) => (
                      <Record
                        key={record._id}
                        record={record}
                        hideOnExport={hideOnExport}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody className=" [&>tr:nth-child(odd)]:bg-body-bg [&>tr:nth-child(odd)]:dark:bg-dark-body-bg">
                {participants.length ? (
                  participants.map((participant, index) => (
                    <tr key={participant._id}>
                      <td className="whitespace-nowrap py-3 px-4">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap py-3 px-4">
                        {participant.fullName}
                      </td>
                      <td className="whitespace-nowrap py-3 px-4">
                        {participant.email}
                      </td>

                      {records.map((record) => {
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
                          calculateParticipantAttendancePercentage.get(
                            participant.fullName
                          )
                            ? calculateParticipantAttendancePercentage.get(
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
          {allParticipants.length ? (
            <Pagination itemsPerTable={itemsPerTable} />
          ) : (
            <></>
          )}
          <DeleteAttendance deleteAttendance={deleteAttendace} />
        </div>
      </DashboardLayout>
    </PrivatRoute>
  );
};

export default AttendancePage;
