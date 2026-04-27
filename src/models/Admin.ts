import mongoose, { 
  Schema, 
  model, 
  models,
} from 'mongoose';
import { IAdmin } from './interfaces';

const AdminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

export const Admin = (models.Admin as mongoose.Model<IAdmin>) || model<IAdmin>('Admin', AdminSchema);