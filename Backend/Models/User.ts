import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import { IUser } from '../Interface/User';
import dotenv from 'dotenv';
dotenv.config();
const userSchema = new Schema<IUser>({
  full_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  mobile_phone_number: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  nationality: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  order: {
    type: [String],
    required: true,
  },
});

userSchema.methods.generateAuthToken = function (isAdmin: boolean) {
  const pk: any = process.env.JWT_PRIVATE_KEY;
  const token = jwt.sign({ _id: this._id, isAdmin: isAdmin }, pk);
  return token;
};

const User = model<IUser>('user', userSchema);
export default User;
