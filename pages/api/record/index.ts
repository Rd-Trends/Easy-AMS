import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Attendance from "../../../models/attendanceModel";
import { server } from "../../../config";
import init from "../../../middlewares/init";
import auth from "../../../middlewares/auth";
import { NextApiReq } from "../../../interface";
import Record from "../../../models/recordModel";
import crypto from "crypto";

const handler = nextConnect();

handler
  .use(init)
  .use(auth)
  .post(async (req: NextApiReq, res: NextApiResponse) => {
    try {
      const recordId = crypto.randomBytes(5).toString("hex");
      const { title, attendanceId } = req.body;
      console.log(recordId);

      const record = new Record({
        title,
        participants: {},
        recordId,
        attendanceId,
      });

      await record.save();

      return res.status(201).json(record);
    } catch (error) {
      console.log(error);
      res.status(500).send("an error occured");
    }
  });

export default handler;
