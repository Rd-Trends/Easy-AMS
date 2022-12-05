import nextConnect from "next-connect";
import session from "../lib/session";
import dbConnect from "../lib/dbConnect";
import passport from "../lib/passportGoogle";

const init = nextConnect();

init
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(session)
  .use(passport.initialize())
  .use(passport.session());

export default init;
