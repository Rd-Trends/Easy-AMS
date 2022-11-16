import React, { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";

const AttendancePage = () => {
  const [itemsPerTable, setItemsPerTable] = useState<Number>(10);

  return (
    <DashboardLayout>
      <div className="block px-4 py-8 w-full overflow-x-auto shadow-2xl bg-element-bg  dark:bg-dark-element-bg rounded-lg text-font-color dark:text-dark-font-color">
        <div className=" flex flex-col md:flex-row justify-between md:items-center mb-6">
          <div className="flex items-center gap-2">
            <p>show</p>
            <input
              className=" border-none py-3 pl-4 rounded-sm outline-none bg-body-bg dark:bg-dark-body-bg"
              type="number"
              value={itemsPerTable.toString()}
              onChange={(e) => setItemsPerTable(Number(e.target.value))}
            />
            <p>entries</p>
          </div>
          <div className=" flex items-center bg-body-bg  dark:bg-dark-body-bg rounded-lg [&>*]:py-3">
            <input
              type="text"
              placeholder="search"
              className=" bg-transparent outline-none border-none px-4"
            />
          </div>
        </div>

        <table className=" table-auto border-collapse w-full border-b-2 dark:border-gray-600">
          <thead className=" border-b-2 dark:border-gray-600">
            <tr className=" [&>th]:min-w-[150px] w-full [&>th]:text-left ">
              <th className=" px-4 whitespace-nowrap py-4">Name</th>
              <th className=" px-4 whitespace-nowrap py-4">week 1</th>
              <th className=" px-4 whitespace-nowrap py-4">week 1</th>
              <th className=" px-4 whitespace-nowrap py-4">week 1</th>
              <th className=" px-4 whitespace-nowrap py-4">week 1</th>
              <th className=" px-4 whitespace-nowrap py-4">week 1</th>
            </tr>
          </thead>
          <tbody className=" [&>tr:nth-child(odd)]:bg-body-bg [&>tr:nth-child(odd)]:dark:bg-dark-body-bg">
            <tr>
              <td className="whitespace-nowrap p-4">Emma Hayes</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">absent</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap p-4">Emma Hayes</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">absent</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap p-4">Emma Hayes</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">absent</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap p-4">Emma Hayes</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">absent</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap p-4">Emma Hayes</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">absent</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap p-4">Emma Hayes</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">absent</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap p-4">Emma Hayes</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">absent</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap p-4">Emma Hayes</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">present</td>
              <td className="whitespace-nowrap p-4">absent</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage;
