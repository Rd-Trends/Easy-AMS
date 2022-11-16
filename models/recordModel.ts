import { Schema, model, models, Types } from "mongoose";

interface IRecord {
  title: string;
  participants?: Map<string, string>;
  status: Boolean,
}

const recordSchema = new Schema<IRecord>({
  title: {
    type: String,
    required: [true, "Please enter the title od this attendace"],
  },
  participants: { type: Map, of: String },
  status: {type: Boolean, default: true}
});

const Record =
  models.Record || model<IRecord>("Record", recordSchema);

export default Record;
