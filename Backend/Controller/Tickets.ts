import { Request, Response } from 'express';
import Ticket from '../Models/Ticket';
import Event from '../Models/Event';
import { validateTicket } from '../Validation/Tickets';
import moment from 'moment';

export const getAll = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find({
      event_id: req.params.id,
      on_date: { $gte: new Date() },
    });
    tickets.map((data) => {
      const today = new Date();
      console.log(today, data.on_date);
    });
    res.send(tickets);
  } catch (err) {
    console.log(err);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    res.send(ticket);
  } catch (err) {
    console.log(err);
  }
};

export const createTicket = async (req: any, res: Response) => {
  try {
    const date = new Date(req.body.on_date);
    req.body.on_date = date;
    const event: any = await Event.findById(req.params.id);
    const { error } = validateTicket(req.body);
    if (error) {
      res.status(400).send(error);
    }

    if (moment(event.start_date).isAfter(req.body.on_date)) {
      return res.status(400).send({
        message: 'on_date should be greater then or eqaul to events start_date',
        esd: event.start_date,
        od: req.body.on_date,
        isoa: moment(event.start_date).isAfter(req.body.on_date),
      });
    }
    if (moment(event.end_date).isBefore(req.body.on_date)) {
      return res.status(400).send({
        message: 'on_date should be smaller then or eqaul to events end_date',
        esd: event.end_date,
        od: req.body.on_date,
        isob: moment(event.end_date).isBefore(req.body.on_date),
      });
    }

    const ticket: any = new Ticket({
      event_id: event._id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      qauntity: req.body.qauntity,
      total_qauntity: req.body.qauntity,
      on_date: req.body.on_date,
    });
    await ticket.save();

    const eventList = await Event.updateOne(
      { _id: event._id },
      { $push: { tickets: ticket._id } }
    );

    res.send(ticket);
  } catch (err: any) {
    console.log(err.message);
  }
};
