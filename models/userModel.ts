import { Schema, model, models } from "mongoose";

interface IUser {
  fullName: string;
  email: string;
  password?: string | number;
  image?: string;
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: [true, "Your Full Name is required"] },
  email: { type: String, required: [true, "Your email is required"] },
  password: { type: String || Number },
  image: { type: String },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
