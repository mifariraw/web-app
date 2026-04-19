import mongoose, { 
  Schema, 
  model, 
  models,
} from "mongoose";
import { IEvent } from "./interfaces";

const EventImageSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  { _id: true, timestamps: true }
);

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
    locationTranslation: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    coverImageUrl: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    images: {
      type: [EventImageSchema],
      default: []
    }
  },
  { timestamps: true }
);

export const Event = (models.Event as mongoose.Model<IEvent>) || model<IEvent>("Event", EventSchema);