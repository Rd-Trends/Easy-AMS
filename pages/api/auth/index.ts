import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import { NextApiReq } from "../../../interface";
import init from "../../../middlewares/init";
// import passport from "../../../lib/passportLocal";

const handler = nextConnect();

handler.use(init).get((req: NextApiReq, res: NextApiResponse) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).send("Unauthorized");
  }
});

export default handler;
