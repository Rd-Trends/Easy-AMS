import React, { memo, useEffect, useState } from "react";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { styles } from "../constants/style";
import { user } from "../interface";

interface paginationProps {
  participants: user[];
  itemsPerTable: number;
  tableNumber: number;
  setTableNumber: (table: number) => void;
  setTableOffset: (offset: number) => void;
}

const Pagination = ({
  participants,
  itemsPerTable,
  setTableNumber,
  tableNumber,
  setTableOffset,
}: paginationProps) => {
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(participants.length / itemsPerTable));
  }, [participants, itemsPerTable]);

  // Invoke when user click to request another page.
  const handlePageClick = (selectedItem: { selected: number }) => {
    const newOffset = selectedItem.selected * itemsPerTable;
    setTableOffset(newOffset);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<p>Next</p>}
      previousLabel={"Previous"}
      onPageChange={handlePageClick}
      // onPageActive={(e) => console.log("page active")}
      pageRangeDisplayed={2}
      marginPagesDisplayed={window.innerWidth > 600 ? 5 : 1}
      forcePage={Number(tableNumber) - 1}
      pageCount={pageCount}
      containerClassName={`flex items-center justify-between w-full font-bold text-font-color dark:text-dark-font-color  mx-auto max-w-[90vw] [&>*]:m-0`}
      pageClassName={`py-2 px-4  m-1 b text-font-color dark:text-dark-font-color rounded-sm hover:scale-110`}
      pageLinkClassName={` text-font-color dark:text-dark-font-color `}
      activeClassName={`bg-primary`}
      activeLinkClassName={`text-element-bg dark:text-dark-element-bg`}
    />
  );
};

export default memo(Pagination);
