import React, { useState} from "react";
import { BiExport } from "react-icons/bi";
import { RiFileExcel2Fill } from "react-icons/ri";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";
import { utils, writeFile } from "xlsx";
import Button from "./Button";

const dropIn = {
  hidden: {
    y: "-10px",
    x: "-50%",
    opacity: 0,
  },
  visible: {
    y: "0",
    x: "-50%",
    opacity: 1,
  },
  exit: {
    y: "-5px",
    opacity: 0,
  },
};

interface props {
  setHideOnExport: (hide: boolean) => void;
  tableRef: HTMLTableElement | null;
  title: string | undefined;
}

const ExportTableData = ({ setHideOnExport, tableRef, title }: props) => {
  const [showExport, setShowExpot] = useState<boolean>(false);

  const exportToExcelDoc = async () => {
    const wb = utils.table_to_book(tableRef);
    await writeFile(wb, `${title}-${new Date().toLocaleDateString()}.xlsx`);
  };

  const handleGeneratePdf = async () => {
    setHideOnExport(true);
    const doc = new jsPDF({
      orientation: "landscape",
      format: [tableRef?.offsetWidth!, tableRef?.offsetHeight!],
      unit: "px",
    });

    // Adding the fonts
    doc.setFont("Nunito Sans", "normal");

    await doc.html(tableRef!, {
      async callback(doc) {
        // save the document as a PDF with name of Memes
        doc.save(`${title}-${new Date().toLocaleDateString()}.pdf`);
      },
    });
    setHideOnExport(false);
  };
  return (
    <div className="relative">
      <Button size="md" onClick={() => setShowExpot(!showExport)}>
        <BiExport size={20} />
        <span className="ml-2">Export</span>
      </Button>
      <AnimatePresence>
        {showExport && (
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className=" absolute bg-element-bg dark:bg-dark-body-bg left-1/2 -translate-x-1/2 w-40  mt-2 rounded-md shadow-2xl"
          >
            <Button
              className="rounded-b-none w-full bg-green-500"
              onClick={exportToExcelDoc}
            >
              <RiFileExcel2Fill size={20} />
              <span className="ml-2">To excel</span>
            </Button>
            <Button
              className="rounded-t-none w-full"
              color="danger"
              onClick={handleGeneratePdf}
            >
              <BsFillFileEarmarkPdfFill size={20} />
              <span className="ml-2">To PDF</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExportTableData;
