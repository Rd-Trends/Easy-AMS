import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Record from "../../../../models/recordModel";
import { server } from "../../../../config";
import { record } from "../../../../interface";
import init from "../../../../middlewares/init";
import auth from "../../../../middlewares/auth";
import { NextApiReq } from "../../../../interface";

const handler = nextConnect();

handler
  .use(init)
  .use(auth)
  .patch(async (req: NextApiReq, res: NextApiResponse) => {
    const { recordId } = req.query;

    const { participantId, participantFullName } = req.body;
    const [record] = await Record.find({ recordId });
    if (!record) {
      res.status(404).json({ message: "Invalid record ID" });
    }
    if (participantId && participantFullName && record.active) {
      await fetch(`${server}/api/attendance/${record.attendanceId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ participantId }),
        method: "PATCH",
      });

      record.participants.set(`${participantFullName}`, "present");
      record.save().then((record: record) => {
        res.status(200).json(record);
      });
    }

    if (!record.active) {
      res.status(403).json({
        message:
          "Signing of attendance have been disabled for this record, contact the owner to enable it!",
      });
    }
  });

export default handler;
