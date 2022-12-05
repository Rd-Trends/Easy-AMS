import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { TbTrashX } from "react-icons/tb";
import Button from "./Button";
import Modal from "./Modal";

interface props {
  deleteAttendance: () => void;
}

const DeleteAttendance = ({ deleteAttendance }: props) => {
  const [showDeleteAttendanceModal, setShowDeleteAttendanceModal] =
    useState<boolean>(false);
  const [isProcessing, setisProcessing] = useState(false);
  return (
    <>
      <div className=" flex items-center justify-end">
        <Button
          color="danger"
          onClick={() => setShowDeleteAttendanceModal(true)}
        >
          <TbTrashX />
          <span className="ml-2">Delete Attendance</span>
        </Button>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {showDeleteAttendanceModal && (
          <Modal closeModal={() => setShowDeleteAttendanceModal(false)}>
            <div className="p-4 [&>p]:mb-4 font-normal">
              <p className=" font-bold">
                Are you sure want to delete this attendance
              </p>
              <p>This process is irreversible and cannot be undone</p>
              <div className="flex items-center justify-end gap-4 pt-2">
                <Button
                  onClick={() => setShowDeleteAttendanceModal(false)}
                  color="secondary"
                >
                  canceel
                </Button>
                <Button
                  color="danger"
                  loading={isProcessing}
                  onClick={() => {
                    setisProcessing(true);
                    deleteAttendance();
                  }}
                >
                  delete
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeleteAttendance;
