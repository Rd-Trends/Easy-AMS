import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Button from "./Button";
import Modal from "./Modal";
import { AiOutlinePlus } from "react-icons/ai";
import useAttendanceStore from "../store";

const CreateRecord = ({ attendanceId }: { attendanceId: string }) => {
  const [title, setTitle] = useState<string>("");
  const [isProcessing, setisProcessing] = useState<boolean>(false);
  const [showCreateRecord, setShowCreateRecord] = useState<Boolean>(false);

  const createNewRecord = useAttendanceStore((state) => state.createNewRecord);

  return (
    <div>
      <Button size="md" onClick={() => setShowCreateRecord(true)}>
        <AiOutlinePlus size={20} />
        <span className="ml-2">New Record</span>
      </Button>
      <AnimatePresence initial={false} mode="wait">
        {showCreateRecord && (
          <Modal size="sm" closeModal={() => setShowCreateRecord(false)}>
            <div className="p-4 w-full text-font-color dark:text-dark-font-color">
              <h2 className="mb-4 text-xl font-bold">Create Record</h2>
              <form
                onSubmit={(e) => {
                  setisProcessing(true);
                  e.preventDefault();
                  createNewRecord(title, attendanceId, () => {
                    setShowCreateRecord(false);
                    setisProcessing(false);
                    setTitle("");
                  });
                }}
                className=" w-full font-extralight"
              >
                <label className=" block mb-4">
                  Title
                  <input
                    type="text"
                    placeholder="week 1"
                    className="block mt-1 border-2 dark:border-gray-700 w-full outline-none hover:border-primary dark:hover:border-primary py-2 px-4 rounded-md bg-transparent"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                  />
                </label>

                <Button className="w-full mt-8" loading={isProcessing}>
                  Create Record
                </Button>
              </form>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateRecord;
