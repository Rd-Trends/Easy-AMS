import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

const CreateAttendance = ({
  hideCreateAttendance,
  createNewAttendance,
}: {
  hideCreateAttendance: () => void;
  createNewAttendance: (title: string, description: string) => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isProcessing, setisProcessing] = useState<boolean>(false);

  return (
    <Modal size="md" closeModal={hideCreateAttendance}>
      <div className="p-4 w-full text-font-color dark:text-dark-font-color">
        <h2 className="mb-4 text-xl font-bold">Create Attendance</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setisProcessing(true);
            createNewAttendance(title, description);
          }}
          className=" w-full font-extralight"
        >
          <label className=" block mb-4">
            Title
            <input
              type="text"
              placeholder="Attendance title"
              className="block mt-1 border-2 dark:border-gray-700 w-full outline-none hover:border-primary dark:hover:border-primary py-2 px-4 rounded-md bg-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // {...register("email")}
            />
          </label>
          <label className=" block mb-4">
            Description
            <textarea
              placeholder="a brief description about the attendance"
              className="block mt-1 border-2 dark:border-gray-700 w-full outline-none hover:border-primary dark:hover:border-primary py-2 px-4 rounded-md bg-transparent"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              // {...register("email")}
            />
          </label>
          <Button className="w-full" loading={isProcessing}>
            Create attendance
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateAttendance;
