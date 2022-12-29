import { Request, Response } from 'express';
import Order from '../Models/Order';
import Ticket from '../Models/Ticket';
import User from '../Models/User';
import { validateOrder } from '../Validation/Order';
import { stripe } from '../Start/Stripe';
import Events from '../Models/Event';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const order = await Order.find({ owner_id: req.params.id });
    res.send(order);
  } catch (err) {
    console.log(err);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const order = await Order.find();
    res.send(order);
  } catch (err) {
    console.log(err);
  }
};

export const post = async (req: any, res: Response) => {
  try {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error);

    let show: any = await Ticket.findById(req.body.ticket_id);
    let user: any = await User.findById(req.body.user_id);
    let event: any = await Events.findById(show.event_id);
    if (show.qauntity < req.body.ticket_qauntity) {
      res.status(400).send('Invalid Qauntity');
    }

    const price = show.price * req.body.ticket_qauntity;
    const qauntity = show.qauntity - req.body.ticket_qauntity;
    let order: any = new Order({
      owner_id: user._id,
      owner: user,
      event: {
        show,
        event,
      },
      ticket: req.body.ticket_qauntity,
      on_date: new Date(),
      total_price: price,
    });
    await order.save();

    const update = await Ticket.updateOne(
      { _id: req.body.ticket_id },
      {
        qauntity,
      }
    );

    const userOrder = await User.updateOne(
      { _id: req.body.user_id },
      { $push: { order: order._id } }
    );

    res.status(200).send({ order, update });
  } catch (err) {
    console.log('🚀 ~ file: Event.ts ~ line 93 ~ post ~ err', err);
  }
};

export const pay = async (req: Request, res: Response) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(req.body.amount) * 100,
      currency: 'inr',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(200).send({ client_secret: paymentIntent.client_secret });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const delet = async (req: Request, res: Response) => {
  try {
    let order: any = await Order.findById(req.params.id);
    let ticket: any = await Ticket.findById(order.event.show._id);
    console.log(order.ticket,ticket.qauntity);
    
    const qauntity = order.ticket + ticket.qauntity;
    ticket = await Ticket.updateOne({ _id: order.ticket_id }, { qauntity });
    order = await Order.deleteOne({ _id: req.params.id });

    if (order.deletedCount === 0)
      return res.status(404).send('Order not found');
    else return res.send({ order,ticket });
  } catch(err) {
    console.log(err);
    
    return res.status(404).send('Order not found');
  }
};
