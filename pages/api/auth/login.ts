import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import { NextApiReq } from "../../../interface";
import init from "../../../middlewares/init";
import passport from "../../../lib/passportLocal";

const handler = nextConnect();

handler.use(init).post((req: NextApiReq, res: NextApiResponse, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Display message without using flash option
      return res.status(401).json({ message: info.message });
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json(req.user);
    });
  })(req, res, next);
});

export default handler;
