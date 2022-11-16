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
      const { id } = req.query;
      const attendance = await Attendance.findById(id)
        .populate("participants", "fullName email")
        .populate("records", "title participants status", Record);

      return res.status(200).json(attendance);
    } catch (err) {
      return res.status(500).send("an error occured");
    }
  })
  .patch(async (req: NextApiReq, res: NextApiResponse) => {
    const { id } = req.query;
 
    const { recordId, participantId } = req.body;
    if (recordId) {
      await Attendance.findByIdAndUpdate(
        id,
        { $push: { records: recordId } },
        { new: true }
      );
    }

    if (participantId) {
      console.log(participantId);

      await Attendance.findByIdAndUpdate(
        id,
        { $push: { participants: participantId } },
        { new: true }
      );
      // ).exec(function (err, attendace) {
      //   if (err) {
      //     console.log(err);
      //     res.status(500).send(err);
      //   } else {
      //     console.log(attendace);
      //     // res.status(200).json(record);
      //   }
      // });
    }
  });

export default handler;
