import { Request, Response } from 'express';
import slug from 'slug';

import Events from '../Models/Event';
import Order from '../Models/Order';
import Ticket from '../Models/Ticket';

export const get = async (req: Request, res: Response) => {
  try {
    const event = await Events.find().sort('name');
    res.send(event);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

export const getPage = async (req: any, res: Response) => {
  try {
    const page: number = Math.max(0, req.query?.page);
    let name: string | null = req.query?.name;
    let description: string | null = req.query?.description;
    let event: any;
    let allEvent: any;
    if (name && description) {
      event = await Events.find({
        name: { $regex: name, $options: 'i' },
        description: { $regex: description, $options: 'i' },
      })
        .sort(' name')
        .skip(10 * (page - 1))
        .limit(10);

      allEvent = await Events.find({
        name: { $regex: name, $options: 'i' },
        description: { $regex: description, $options: 'i' },
      }).sort('name');
    } else if (name) {
      event = await Events.find({
        name: { $regex: name, $options: 'i' },
      })
        .sort(' name')
        .skip(10 * (page - 1))
        .limit(10);

      allEvent = await Events.find({
        name: { $regex: name, $options: 'i' },
      }).sort('name');
    } else if (description) {
      event = await Events.find({
        description: { $regex: description, $options: 'i' },
      })
        .sort(' name')
        .skip(10 * (page - 1))
        .limit(10);

      allEvent = await Events.find({
        description: { $regex: description, $options: 'i' },
      }).sort('name');
    } else {
      event = await Events.find({})
        .sort(' name')
        .skip(10 * (page - 1))
        .limit(10);

      allEvent = await Events.find().sort('name');
    }

    allEvent = Math.ceil(allEvent.length / 10);

    res.send({
      event,
      page_number: page,
      page_content: event.length,
      total_pages: allEvent,
    });
  } catch (err: any) {
    res.status(400).send(err.message);

    console.log(err.message);
  }
};

export const get1 = async (req: Request, res: Response) => {
  try {
    const event = await Events.findById(req.params.id);
    if (!event) return res.status(404).send('Event not found');
    else return res.send(event);
  } catch {
    return res.status(404).send('Event not found');
  }
};

export const post = async (req: any, res: Response) => {
  try {
    let event: any = new Events({
      slug: slug(req.body.name, '_'),
      name: req.body.name,
      description: req.body.description,
      poster: req.file.filename,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      tickets: [],
    });
    await event.save();
    res.status(200).send(event);
  } catch (err) {
    res.status(400).send(err);

    console.log('🚀 ~ file: Event.ts ~ line 93 ~ post ~ err', err);
  }
};

export const delet = async (req: Request, res: Response) => {
  try {
    let event = await Events.deleteOne({ _id: req.params.id });
    let ticket = await Ticket.deleteMany({ event_id: req.params.id });
    let order = await Order.deleteMany({ event_id: req.params.id });
    if (event.deletedCount === 0)
      return res.status(404).send('event not found');
    else return res.send({ event, ticket, order });
  } catch {
    return res.status(404).send('event not found');
  }
};
