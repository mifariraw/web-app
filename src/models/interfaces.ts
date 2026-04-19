import { EventPhoto } from "@src/app/admin/event/[id]/EventGallery";
import { Document } from "mongoose";

enum EventType {
  Concert = "concert",
  Event = "event",
  PersonalProject = "personal_project",
  Portraits = "portraits"
}

export interface IAdmin extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent extends Document {
  title: string;
  titleTranslation: string;
  type: EventType;
  location: string;
  locationTranslation: string;
  date: Date;
  coverImageUrl: string;
  images?: EventPhoto[];
  createdAt: Date;
  updatedAt: Date;
}