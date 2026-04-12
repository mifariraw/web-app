import mongoose, { 
  Schema, 
  model, 
  models,
} from "mongoose";
import { IEvent } from "./interfaces";

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    titleTranslation: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["concert", "event", "personal_project", "portraits"],
      required: true
    },
    location: {
      type: String,
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true
    },
    coverImageUrl: {
      type: String,
      required: true
    },
    images: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export const Event = (models.Event as mongoose.Model<IEvent>) || model<IEvent>("Event", EventSchema);