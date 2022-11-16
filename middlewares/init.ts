import nextConnect from "next-connect";
import session from "../lib/session";
import dbConnect from "../lib/dbConnect";
import passport from "passport";

const init = nextConnect();

init
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(session)
  .use(passport.session());

export default init;
