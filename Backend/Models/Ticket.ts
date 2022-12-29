import { ITicket } from '../Interface/Ticket';
import { Schema, model } from 'mongoose';

export const ticketSchema = new Schema<ITicket>({
  event_id: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 750,
  },
  price: {
    type: Number,
    required: true,
  },
  qauntity: {
    type: Number,
    required: true,
  },
  total_qauntity: {
    type: Number,
    required: true,
  },
  on_date: {
    type: Date,
    required: true,
  },
});

const Ticket = model<ITicket>('Ticket', ticketSchema);
export default Ticket;
