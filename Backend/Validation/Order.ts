import Joi from 'joi';

export const validateOrder = (data: any) => {
  const schema = Joi.object({
    ticket_id: Joi.string().min(3).max(255).required(),
    user_id: Joi.string().min(3).max(750).required(),
    ticket_qauntity: Joi.number().required(),
  });
  return schema.validate(data);
};
