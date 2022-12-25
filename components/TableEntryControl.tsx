import React, { useState } from "react";

interface props {
  itemsPerTable: number;
  setItemsPerTable: (itemsPerTable: number) => void;
}

const TableEntryControl = ({ itemsPerTable, setItemsPerTable }: props) => {
  const [numberOfItems, setNumberOfItems] = useState(itemsPerTable);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfItems(Number(e.target.value));
    if (Number(e.target.value) > 0) {
      setItemsPerTable(Number(e.target.value));
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <p>show</p>
      <input
        className=" border-none py-3 pl-4 rounded-sm outline-none bg-body-bg dark:bg-dark-body-bg w-full"
        type="number"
        value={numberOfItems}
        onChange={handleChange}
      />
      <p>entries</p>
    </div>
  );
};

export default TableEntryControl;
