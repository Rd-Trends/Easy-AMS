import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Record from "../../../models/recordModel";
import {server} from "../../../config"
import init from "../../../middlewares/init";
import auth from "../../../middlewares/auth";
import { NextApiReq } from "../../../interface";

const handler = nextConnect();

handler
  .use(init)
  .use(auth)
  .patch(async (req: NextApiReq, res: NextApiResponse) => {
    const { id } = req.query;

    const { attendanceId, participantId, participantFullName } = req.body;

    await fetch(`${server}/api/attendance/${attendanceId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participantId }),
      method: "PATCH",
    });

    Record.findByIdAndUpdate(
      id,
      {
        $set: { [`participants.${participantFullName}`]: "present" },
      },
      { new: true }
    ).exec(function (err, record) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        console.log(record);
        res.status(200).json(record);
      }
    });
  });

export default handler;
