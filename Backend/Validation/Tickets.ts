import Joi from 'joi';
import { ITicket } from '../Interface/Ticket';

export const validateTicket = (data: ITicket) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).max(750).required(),
    price: Joi.number().required(),
    qauntity: Joi.number().required(),
    on_date: Joi.date().required(),
  });
  return schema.validate(data);
};
