import jwt from 'jsonwebtoken';
import { validateUser, validateAuth } from '../Validation/User';
import { Request, Response } from 'express';
import User from '../Models/User';
import Roles from '../Models/Roles';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import dotenv from 'dotenv';
dotenv.config();

export const getCurentUSer = async (req: any, res: Response) => {
  try {
    const pk: any = process.env.JWT_PRIVATE_KEY;
    
    // const pk: any = 'avksfngasdfn_vk10aa_fndkn_dakvbkasb_jb';
    const payload: any = jwt.verify(req.body.token, pk);
    const user: any = await User.findById(payload._id);

    res.send({ ...payload, ...user._doc });
  } catch (err) {
    return res.status(400).send('Invalid Token Provided');
  }
};

//Signup Function
export const postUserFunction = async (data: any) => {
  let Admin;
  try {
    const { error } = validateUser(data);
    if (error) return { error: true, status: 400, message: error };

    let user: any = await User.findOne({ email: data.email });
    if (user)
      return { error: true, status: 400, message: 'user already registered' };

    user = new User(
      _.pick(data, [
        'full_name',
        'mobile_phone_number',
        'email',
        'password',
        'nationality',
      ])
    );

    user.order = [];

    if (data.isAdmin === true) {
      Admin = data.isAdmin;
    } else {
      Admin = false;
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const role = new Roles({
      _id: user._id,
      is_Admin: Admin,
      is_user: !Admin,
    });
    await role.save();

    return { error: false, status: 200, message: user };
  } catch (err) {
    console.log(err);
  }
};

//signup
export const postUser = async (req: Request, res: Response) => {
  try {
    const result: any = await postUserFunction(req.body);
    if (result.error) {
      res.status(result.status).send(result.message);
    } else {
      let user = _.pick(result.message, [
        '_id',
        'full_name',
        'email',
        'nationality',
      ]);
      res.send(user);
    }
  } catch (err) {
    console.log(err);
  }

  // res.send('f');
  // console.log(Promise.resolve(result));
};

//login
export const postAuth = async (req: Request, res: Response) => {
  try {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error);

    let user: any = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid User or Password');
    let roles: any = await Roles.findById(user._id);

    let password = await bcrypt.compare(req.body.password, user.password);
    if (!password) return res.status(400).send('Invalid User or Password');

    const token = user.generateAuthToken(roles.is_Admin);
    res.send(token);
  } catch (err) {
    console.log(err);
  }
};
