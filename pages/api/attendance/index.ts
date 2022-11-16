import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Attendance from "../../../models/attendanceModel";
import init from "../../../middlewares/init";
import auth from "../../../middlewares/auth";
import { NextApiReq } from "../../../interface";

const handler = nextConnect();

handler
  .use(init)
  .use(auth)
  .get(async (req: NextApiReq, res: NextApiResponse) => {
    try {
      const allAttendance = await Attendance.find(
        { user: req.user.id },
        "title description participants"
      );
      return res.status(200).json(allAttendance);
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

      const newAttendace = new Attendance({
        title,
        user: req.user.id,
        description,
      });

      await newAttendace.save();

      const attendace = await Attendance.findById(newAttendace._id).populate(
        "user",
        "fullName email"
      );
      res.status(201).json(attendace);
    } catch (err) {
      res.status(500).end();
    }
  });

export default handler;
