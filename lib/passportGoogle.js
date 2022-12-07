import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/userModel";
import { server } from "../config";

passport.serializeUser(function (user, done) {
  // serialize the username into session
  done(null, user);
});

passport.deserializeUser(function (user, done) {
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
        console.log(profile.picture);
        if (userExists) {
          const { email, fullName, _id, image } = userExists;
          return done(null, { email, fullName, _id, image });
        }

        // if user doesn't exists, create a new user
        const user = new User({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          image: profile.picture,
        });

        await user.save();
        return done(null, {
          fullName: user.fullName,
          email: user.email,
          _id: user._id,
          image: user.image,
        });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;
