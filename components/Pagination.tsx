import React, { memo, useEffect, useState } from "react";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { styles } from "../constants/style";
import { user } from "../interface";
import useAttendanceStore from "../store";

interface paginationProps {
  itemsPerTable: number;
}

const Pagination = ({ itemsPerTable }: paginationProps) => {
  const [pageCount, setPageCount] = useState(0);
  const allParticipants = useAttendanceStore((store) => store.allParticipants);
  const setParticipants = useAttendanceStore((store) => store.setParticipants);
  const [itemsOffSet, setiItemsOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(0);

  const calculateEndOffset = (offset: number) => {
    let endOffset = offset + itemsPerTable;
    if (itemsPerTable > allParticipants.length - offset) {
      endOffset = allParticipants.length;
    }
    return endOffset;
  };

  useEffect(() => {
    setPageCount(Math.ceil(allParticipants.length / itemsPerTable));
    setParticipants(0, itemsPerTable);
    setEndOffset(calculateEndOffset(0));
  }, [allParticipants, itemsPerTable]);

  // Invoke when user click to request another page.
  const handlePageClick = (selectedItem: { selected: number }) => {
    const offset = selectedItem.selected * itemsPerTable;
    setiItemsOffset(offset);
    const endOffset = calculateEndOffset(offset);
    setEndOffset(endOffset);
    setParticipants(offset, endOffset);
  };

  return (
    <div className=" flex flex-col md:flex-row md:items-center md:justify-between py-10 space-y-4 md:space-y-0 md:gap-4">
      <p className=" w-full font-bold min-w-fit">{`Showing ${itemsOffSet + 1} ${
        endOffset > itemsOffSet + 1 ? `to ${endOffset}` : ""
      } of  ${allParticipants.length} ${
        allParticipants.length > 1 ? "entries" : "entry"
      }`}</p>

      <ReactPaginate
        breakLabel="..."
        nextLabel={<p>Next</p>}
        previousLabel={"Previous"}
        onPageChange={handlePageClick}
        onPageActive={(e) => console.log("page active")}
        pageRangeDisplayed={2}
        marginPagesDisplayed={window.innerWidth > 600 ? 5 : 1}
        // forcePage={Number(tableNumber) - }
        pageCount={pageCount}
        containerClassName={`flex items-center justify-between w-full font-bold text-font-color dark:text-dark-font-color  mx-auto max-w-[90vw] [&>*]:m-0`}
        pageClassName={`py-2 px-4  m-1 b text-font-color dark:text-dark-font-color rounded-sm hover:scale-110`}
        pageLinkClassName={` text-font-color dark:text-dark-font-color `}
        activeClassName={`bg-primary`}
        activeLinkClassName={`text-element-bg dark:text-dark-element-bg`}
      />
    </div>
  );
};

export default memo(Pagination);
