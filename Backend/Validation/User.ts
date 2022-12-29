import Joi from 'joi';
import { IValidateUser, IValidateAuth } from '../Interface/User';

export const validateUser = (data: IValidateUser) => {
  const schema = Joi.object({
    full_name: Joi.string().min(3).max(255).required(),
    mobile_phone_number: Joi.string().min(10).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(255).required(),
    nationality: Joi.string().min(3).max(255).required(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(data);
};

export const validateAuth = (data: IValidateAuth) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(data);
};
