import AuthMiddlewear from '../Middleware/Auth';
import Admin from '../Middleware/Admin';
import express from 'express';
const router = express.Router();
import { getAll, getOne, createTicket } from '../Controller/Tickets';

router.get('/getAll/:id', getAll);
router.get('/getOne/:id', getOne);
router.post('/:id', [AuthMiddlewear, Admin], createTicket);
export default router;
