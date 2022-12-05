import React, { useState } from "react";
import Modal from "./Modal";

const CreateAttendance = ({
  hideCreateAttendance,
  createNewAttendance,
}: {
  hideCreateAttendance: () => void;
  createNewAttendance: (title: string, description: string) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Modal size="md" closeModal={hideCreateAttendance}>
      <div className="p-4 w-full text-font-color dark:text-dark-font-color">
        <h2 className="mb-4 text-xl font-bold">Create Attendance</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createNewAttendance(title, description);
          }}
          className=" w-full font-extralight"
        >
          <label className=" block mb-4">
            Title
            <input
              type="text"
              placeholder="Attendance title"
              className="block mt-1 border-2 dark:border-gray-700 w-full outline-primary py-2 px-4 rounded-md bg-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // {...register("email")}
            />
          </label>
          <label className=" block mb-4">
            Description
            <textarea
              placeholder="a brief description about the attendance"
              className="block mt-1 border-2 dark:border-gray-700 w-full outline-primary py-2 px-4 rounded-md bg-transparent"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              // {...register("email")}
            />
          </label>
          <button className="px-4 py-2 rounded-md bg-primary block w-full text-white mt-8">
            Create attendance
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateAttendance;
