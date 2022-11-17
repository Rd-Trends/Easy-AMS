import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/userModel";
import { server } from "../config";

passport.serializeUser(function (user, done) {
  // serialize the username into session
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // deserialize the username back into user object
  //   const user = findUserByUsername(req, id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${server}/api/auth/google/callback`,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const userExists = await User.findOne({
          email: profile.emails[0].value,
        });
        if (userExists) {
          const { email, fullName, _id } = userExists;
          return done(null, { email, fullName, id: _id });
        }

        // if user doesn't exists, create a new user
        const user = new User({
          fullName: profile.displayName,
          email: profile.emails[0].value,
        });

        await user.save();
        return done(null, {
          fullName: user.fullName,
          email: user.email,
          id: user._id,
        });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;
