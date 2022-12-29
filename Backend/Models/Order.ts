import { Schema, model } from 'mongoose';
import { IOrder } from '../Interface/Order';

const orderSchema = new Schema<IOrder>({
  owner_id: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  owner: {
    type: Object,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  event: {
    type: Object,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  ticket: {
    type: Number,
    required: true,
  },
  on_date: {
    type: Date,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
});

const Order = model<IOrder>('Order', orderSchema);
export default Order;
