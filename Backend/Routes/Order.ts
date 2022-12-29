import express from 'express';
const router = express.Router();
import { post, pay, getUsers, getAll,delet } from '../Controller/Order';
import AuthMiddlewear from '../Middleware/Auth';
import Admin from '../Middleware/Admin';

router.post('/', [AuthMiddlewear], post);
router.get('/getUsers/:id', [AuthMiddlewear], getUsers);
router.get('/getAll', [AuthMiddlewear, Admin], getAll);
router.post('/pay', pay);
router.delete('/:id', delet);

export default router;
