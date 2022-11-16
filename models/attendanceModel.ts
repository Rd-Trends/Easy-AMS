import { Schema, model, models, Types } from "mongoose";

interface IAttendance {
  user: Types.ObjectId;
  title: string;
  participants?: Types.ObjectId[];
  description: string;
  records?: Types.ObjectId[];
}

const attendanceSchema = new Schema<IAttendance>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    required: [true, "Please enter the title od this attendace"],
  },
  description: {
    type: String,
    required: [true, "Please enter a brief a description of this attendace"],
  },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  records: [{ type: Schema.Types.ObjectId, ref: "Record" }],
});

const Attendance =
  models.Attendance || model<IAttendance>("Attendance", attendanceSchema);

export default Attendance;
