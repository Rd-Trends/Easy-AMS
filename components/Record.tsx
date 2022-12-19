import React, { useState } from "react";
import TakeAttendance from "./TakeAttendance";
import { record } from "../interface";
import { AnimatePresence } from "framer-motion";
import { user } from "../interface";
import Modal from "./Modal";
import Button from "./Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoCopyOutline } from "react-icons/io5";
import { BsClipboardCheck } from "react-icons/bs";
import { motion } from "framer-motion";

interface props {
  record: record;
  hideOnExport: boolean;
  toggleRecordStatus: (id: string, status: string) => void;
  addParticipantsToRecord: (recordId: string, participant: user) => void;
  deleteRecord: (recordId: string) => void;
}

const dropIn = {
  hidden: {
    y: "-10px",
    x: "-50%",
    opacity: 0,
  },
  visible: {
    y: "0",
    x: "-50%",
    opacity: 1,
  },
  exit: {
    y: "-5px",
    opacity: 0,
  },
};

const Record = ({
  record,
  hideOnExport,
  toggleRecordStatus,
  addParticipantsToRecord,
  deleteRecord,
}: props) => {
  const [showTakeAttendance, setShowTakeAttendance] = useState<Boolean>(false);
  const [showDeleteRecordModal, setshowDeleteRecordModal] =
    useState<Boolean>(false);
  const [share, setShare] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const hideTakeAttendance = () => {
    setShowTakeAttendance(false);
  };
  return (
    <th
      data-v={record.title}
      key={record._id}
      className=" px-4 whitespace-nowrap py-4 h-full"
      scope="col"
    >
      <p className="mb-1 text-center">{record.title}</p>
      {!hideOnExport && (
        <div className="flex items-center justify-center space-x-2 w-full">
          <Button
            onClick={() => setShowTakeAttendance(true)}
            disabled={!record.active ? true : false}
            size="sm"
          >
            add
          </Button>
          <div className="relative">
            <Button
              onClick={() => setShare(!share)}
              className=" bg-blue-800"
              disabled={!record.active ? true : false}
              size="sm"
            >
              share
            </Button>
            <AnimatePresence>
              {share && (
                <motion.div
                  variants={dropIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className=" absolute z-10 bg-element-bg dark:bg-dark-element-bg p-4 left-1/2 -translate-x-1/2  mt-4 shadow-2xl cursor-pointer"
                >
                  <CopyToClipboard
                    text={record.recordId}
                    onCopy={() => setCopied(true)}
                  >
                    <div>
                      <p className="mb-2">{record.recordId}</p>
                      {copied ? (
                        <p className=" flex items-center font-normal">
                          <BsClipboardCheck className=" text-green-500" />
                          <span className="ml-2">copied successfully!</span>
                        </p>
                      ) : (
                        <p className=" flex items-center font-normal">
                          <IoCopyOutline />
                          <span className="ml-2">
                            click to copy to clipboard
                          </span>
                        </p>
                      )}
                    </div>
                  </CopyToClipboard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Button
            onClick={() =>
              toggleRecordStatus(record._id, record.active ? "false" : "true")
            }
            size="sm"
            color="secondary"
          >
            {record.active ? "disable" : "enable"}
          </Button>

          <Button
            onClick={() => setshowDeleteRecordModal(true)}
            size="sm"
            color="danger"
          >
            delete
          </Button>
        </div>
      )}

      <AnimatePresence initial={false} mode="wait">
        {showDeleteRecordModal && (
          <Modal closeModal={() => setshowDeleteRecordModal(false)}>
            <div className="p-4 [&>p]:mb-4 font-normal">
              <p className=" font-bold">
                Are you sure want to delete <em>{record.title}</em> record?
              </p>
              <p>This process is irreversible and cannot be undone</p>
              <div className="flex items-center justify-end space-x-4 pt-2">
                <Button
                  onClick={() => setshowDeleteRecordModal(false)}
                  color="secondary"
                >
                  canceel
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    deleteRecord(record._id);
                    setShowTakeAttendance(false);
                  }}
                >
                  delete
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} mode="wait">
        {showTakeAttendance && (
          <TakeAttendance
            addParticipantsToRecord={addParticipantsToRecord}
            hideTakeAttendance={hideTakeAttendance}
            recordId={record._id}
          />
        )}
      </AnimatePresence>
    </th>
  );
};

export default Record;
