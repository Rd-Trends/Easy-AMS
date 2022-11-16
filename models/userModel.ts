import  { Schema, model, models } from "mongoose";

interface IUser {
  fullName: string;
  email: string;
  password?: string | number;
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: [true, "Your Full Name is required"] },
  email: { type: String, required: [true, "Your email is required"] },
  password: { type: String || Number },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
