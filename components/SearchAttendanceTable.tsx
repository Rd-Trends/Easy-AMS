import React from "react";
import useAttendanceStore from "../store";
import { user } from "../interface";

const SearchAttendanceTable = ({ participants }: { participants: user[] }) => {
  const setAllParticipants = useAttendanceStore(
    (store) => store.setAllParticipants
  );
  return (
    <div className=" flex items-center bg-body-bg  dark:bg-dark-body-bg rounded-lg [&>*]:py-3">
      <input
        type="text"
        placeholder="search"
        className=" bg-transparent outline-none border-none px-4"
        onChange={(e) =>
          setAllParticipants(
            participants!.filter((participant) =>
              participant.fullName
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            )
          )
        }
      />
    </div>
  );
};

export default SearchAttendanceTable;
