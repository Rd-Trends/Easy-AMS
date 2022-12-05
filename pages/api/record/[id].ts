import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import Record from "../../../models/recordModel";
import { server } from "../../../config";
import { record } from "../../../interface";
import init from "../../../middlewares/init";
import auth from "../../../middlewares/auth";
import { NextApiReq } from "../../../interface";

const handler = nextConnect();

handler
  .use(init)
  .use(auth)
  .patch(async (req: NextApiReq, res: NextApiResponse) => {
    const { id } = req.query;

    const { participantId, participantFullName, active } = req.body;
    const record = await Record.findById(id);
    if (participantId && participantFullName) {
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

    if (active) {
      record.active = active === "true" ? true : false;
      await record.save();
      res.status(200).end();
    }
  })
  .delete(async (req: NextApiReq, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      await Record.deleteOne({ _id: id });
      return res.status(200).end();
    } catch (er) {
      res.status(500).send("An error occued");
    }
  });

export default handler;
