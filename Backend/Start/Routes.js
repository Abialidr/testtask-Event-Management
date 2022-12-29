import helmet from 'helmet';
import express from 'express';
import user from '../Routes/User';
import event from '../Routes/Event';
import tickets from '../Routes/Tickets';
import order from '../Routes/Order';

export default function (app) {
  app.use(express.json());
  app.use(helmet());
  app.use('/api/tickets', tickets);
  app.use('/api/user', user);
  app.use('/api/event', event);
  app.use('/api/order', order);

}
