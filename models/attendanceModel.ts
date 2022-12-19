import { Schema, model, models, Types } from "mongoose";

interface IAttendance {
  owner: Types.ObjectId;
  ownerLocation?: { latitude: number; longitude: number };
  title: string;
  participants?: Types.ObjectId[];
  description: string;
}

const attendanceSchema = new Schema<IAttendance>({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  ownerLocation: {
    latitude: { type: Schema.Types.Number },
    longitude: { type: Schema.Types.Number },
  },
  title: {
    type: String,
    required: [true, "Please enter the title od this attendace"],
  },
  description: {
    type: String,
    required: [true, "Please enter a brief a description of this attendace"],
  },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Attendance =
  models.Attendance || model<IAttendance>("Attendance", attendanceSchema);

export default Attendance;
