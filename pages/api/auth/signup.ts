import nextConnect from "next-connect";
import { NextApiResponse } from "next";
import { NextApiReq } from "../../../interface";
import User from "../../../models/userModel";
import init from "../../../middlewares/init";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcrypt";

const handler = nextConnect();

handler.use(init);

handler.post(async (req: NextApiReq, res: NextApiResponse, next) => {
  const { fullName, email, password } = req.body;

  if (!isEmail(email)) {
    res.status(400).json({ message: "The email you entered is invalid." });
    return;
  }

  if (!password || !fullName || !password) {
    res.status(400).json({ message: "Missing Field(s)." });
    return;
  }

  const userExists = await User.exists({ email });

  if (userExists) {
    res.status(403).json({ message: "The email has already been used." });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    fullName,
    email: normalizeEmail(email),
    password: hashedPassword,
    image: "",
  });

  await user.save();
  req.login({ fullName, email, _id: user._id, image: user.image }, (err) => {
    if (err) return next(err);
    return res.status(201).json(req.user);
  });
});

export default handler;
