import session from "express-session";
import MongoStore from "connect-mongo";
import { Request, Response, NextFunction } from "express-serve-static-core";

export default function (req: Request, res: Response, next: NextFunction) {
  const mongo = process.env.MONGODB_URI;
  return session({
    secret: process.env.TOKEN_SECRET!,
    store: MongoStore.create({ mongoUrl: mongo }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 60 * 7,
      secure: false,
    }, //7 days
  })(req, res, next);
}
