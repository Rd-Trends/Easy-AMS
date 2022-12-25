import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Attendance from "../../../models/attendanceModel";
import Record from "../../../models/recordModel";
import init from "../../../middlewares/init";
import auth from "../../../middlewares/auth";
import { NextApiReq } from "../../../interface";

const handler = nextConnect();

handler
  .use(init)
  .use(auth)
  .get(async (req: NextApiReq, res: NextApiResponse) => {
    try {
      const { id: attendanceId } = req.query;
      const attendance = await Attendance.findById(attendanceId).populate(
        "participants",
        "fullName email"
      );
      const {
        _id: id,
        title,
        description,
        participants,
        ownerLocation,
      } = attendance;
      const records = await Record.find({ attendanceId: id });
      return res.status(200).json({
        id,
        participants,
        title,
        description,
        records,
        ownerLocation,
      });
    } catch (err) {
      return res.status(500).send("an error occured");
    }
  })
  .patch(async (req: NextApiReq, res: NextApiResponse) => {
    const { id } = req.query;
    const { participantId, userLocation } = req.body;

    const attendance = await Attendance.findById(id);

    if (participantId) {
      if (attendance.participants.includes(participantId)) {
        return;
      } else {
        attendance.participants.push(participantId);
        await attendance.save();
        return;
      }
    }
    if (userLocation) {
      console.log(userLocation);
      attendance.ownerLocation = userLocation;
      await attendance.save();
      return res.status(200).end();
    }
  })
  .delete(async (req: NextApiReq, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      await Record.deleteMany({ attendanceId: id });
      await Attendance.deleteOne({ _id: id });
      res.status(200).end();
    } catch (err) {
      res.status(500).send("An error occured");
    }
  });

export default handler;
