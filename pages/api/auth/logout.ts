import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import { NextApiReq } from "../../../interface";
import init from "../../../middlewares/init";

const handler = nextConnect();

handler.use(init).post((req: NextApiReq, res: NextApiResponse, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(204).end();
  });
});

export default handler;
