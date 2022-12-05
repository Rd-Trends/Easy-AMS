import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Attendance from "../../../models/attendanceModel";
import Record from "../../../models/recordModel";
import init from "../../../middlewares/init";
import auth from "../../../middlewares/auth";
import { attendance, NextApiReq } from "../../../interface";

const handler = nextConnect();

handler
  .use(init)
  .use(auth)
  .get(async (req: NextApiReq, res: NextApiResponse) => {
    try {
      let userAttendance = await Attendance.find(
        { owner: req.user._id },
        "title description participants"
      );
      userAttendance = await Promise.all(
        userAttendance.map(async (attendance, index) => {
          const { title, description, _id, participants } = attendance;
          let records = await Record.find({ attendanceId: _id }, "");

          return {
            _id,
            title,
            description,
            numberOfParticipants: participants.length,
            numberOfRecords: records.length,
          };
        })
      );
      return res.status(200).json(userAttendance);
    } catch (err) {
      res.status(500).end();
    }
  })
  .post(async (req: NextApiReq, res: NextApiResponse) => {
    try {
      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({ message: "Missing field(s)" });
      }

      const attendance = new Attendance({
        title,
        owner: req.user._id,
        description,
      });

      await attendance.save().then((attendance: attendance) => {
        const { title, description, _id } = attendance;
        res.status(201).json({
          _id,
          title,
          description,
          numberOfParticipants: 0,
          numberOfRecords: 0,
        });
      });
    } catch (err) {
      res.status(500).end();
    }
  });

export default handler;
