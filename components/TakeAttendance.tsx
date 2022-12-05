import React, { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import { QrReader } from "react-qr-reader";
import { BiCheckCircle } from "react-icons/bi";
import { user } from "../interface";

interface props {
  hideTakeAttendance: () => void;
  addParticipantsToRecord: (recordId: string, participant: user) => void;
  recordId: string;
}

const TakeAttendance = ({
  hideTakeAttendance,
  addParticipantsToRecord,
  recordId,
}: props) => {
  const [participant, setParticipant] = useState("");
  const [displaySigninMessage, setDisplaySignInMessage] = useState(false);

  const signAttendance = useCallback(() => {
    if (participant) {
      let user = JSON.parse(participant);
      addParticipantsToRecord(recordId, user);
      setDisplaySignInMessage(true);
    }
  }, [participant]);

  useEffect(() => {
    if (participant) {
      signAttendance();
    }
  }, [participant, signAttendance]);

  return (
    <Modal closeModal={hideTakeAttendance}>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            setParticipant(result?.getText());
          } else {
            setDisplaySignInMessage(false);
          }
        }}
        className="w-[100%] h-500px m-auto rounded-md my-0 p-0"
        videoStyle={{
          borderRadius: "6px",
          height: "auto",
          position: "relative",
        }}
        videoContainerStyle={{ paddingTop: "0px", position: "relative" }}
        constraints={{ facingMode: "environment" }}
      />

      {!displaySigninMessage && <div className="spinner"></div>}
      {displaySigninMessage && (
        <div className="flex flex-col items-center px-4 py-6">
          <BiCheckCircle size={60} className=" text-green-600" />
          <p className=" text-center mt-4">
            {JSON.parse(participant).fullName} has been successfully signed
            present
          </p>
        </div>
      )}
    </Modal>
  );
};

export default TakeAttendance;
