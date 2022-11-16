import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Attendance from "../../../models/attendanceModel";
import {server} from "../../../config";
import init from "../../../middlewares/init";
import auth from "../../../middlewares/auth";
import { NextApiReq } from "../../../interface";
import Record from "../../../models/recordModel";
// import fetch from "node-fetch";

const handler = nextConnect();

handler
  .use(init)
  .use(auth)
  .post(async (req: NextApiReq, res: NextApiResponse) => {
    try {
      const { title, attendanceId } = req.body;
      const record = new Record({
        title,
        participants: {},
      });

      record.participants.set("Daniel Ikoyo", "present");

      await record.save();

      await fetch(`${server}/api/attendance/${attendanceId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recordId: record._id }),
        method: "PATCH",
      });

      return res.status(201).json({ record });
    } catch (error) {
      console.log(error);
      res.status(500).send("an error occured");
    }
  });

export default handler;
