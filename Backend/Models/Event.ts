import { Schema, model } from 'mongoose';
import { IEvent } from '../Interface/Event';


const eventSchema = new Schema<IEvent>({
  slug: {
    type: String,
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
  poster: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  tickets: {
    type: [String],
    required: true,
  },
});

const Events = model<IEvent>('Events', eventSchema);
export default Events
