import { Schema, model, models, Types } from "mongoose";

interface IRecord {
  title: string;
  participants?: Map<string, string>;
  active: Boolean;
  attendanceId: Types.ObjectId;
  recordId: string;
}

const recordSchema = new Schema<IRecord>({
  title: {
    type: String,
    required: [true, "Please enter the title od this attendace"],
  },
  participants: { type: Map, of: String },
  active: { type: Boolean, default: true },
  attendanceId: { type: Schema.Types.ObjectId },
  recordId: { type: String },
});

const Record = models.Record || model<IRecord>("Record", recordSchema);

export default Record;
