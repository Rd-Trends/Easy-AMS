import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

const CreateRecord = ({
  hideCreateRecord,
  createNewRecord,
}: {
  hideCreateRecord: () => void;
  createNewRecord: (title: string) => void;
}) => {
  const [title, setTitle] = useState<string>("");
  const [isProcessing, setisProcessing] = useState<boolean>(false);

  return (
    <Modal size="md" closeModal={hideCreateRecord}>
      <div className="p-4 w-full text-font-color dark:text-dark-font-color">
        <h2 className="mb-4 text-xl font-bold">Create Record</h2>
        <form
          onSubmit={(e) => {
            setisProcessing(true);
            e.preventDefault();
            createNewRecord(title);
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
              // {...register("email")}
            />
          </label>

          <Button className="w-full mt-8" loading={isProcessing}>
            Create Record
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateRecord;
