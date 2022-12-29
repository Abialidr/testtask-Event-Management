import Joi from 'joi';
import { IEvent } from '../Interface/Event';

export const validateEvent = (data: IEvent) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).max(750).required(),
    poster: Joi.string().min(3).max(255).required(),
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    tickets: Joi.array().required(),
  });
  return schema.validate(data);
};




