import nextConnect from "next-connect";
import init from "../../../../middlewares/init";
import passport from "../../../../lib/passportGoogle";

const handler = nextConnect();

handler.use(init).get(
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

export default handler;
