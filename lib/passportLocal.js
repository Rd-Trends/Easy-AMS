import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/userModel";
import dbConnect from "./dbConnect";
import bcrypt from "bcrypt";

passport.serializeUser(function (user, done) {
  // serialize the username into session
  done(null, user);
});

passport.deserializeUser(async function (user, done) {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
      passwordField: "password",
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, null, { message: "User not found" });
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false, { message: "Incorrect email or password" });
      }

      return done(null, {
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        _id: user._id,
      });
    }
  )
);

export default passport;
