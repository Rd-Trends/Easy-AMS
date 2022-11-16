import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import { NextApiReq } from "../interface";

const auth = nextConnect();

auth.use((req: NextApiReq, res: NextApiResponse, next) => {
  if (!req.user) {
    res
      .status(401)
      .send(
        "You are not authorized to perform this operation, please login or sign up first."
      );
  }
  next();
});

export default auth;
