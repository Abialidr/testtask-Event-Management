import express from 'express';
import upload from '../Middleware/uploadImage';
const router = express.Router();
import { get1, get, post, getPage ,delet} from '../Controller/Event';
import AuthMiddlewear from '../Middleware/Auth';
import Admin from '../Middleware/Admin';

router.get('/all', get);
router.get('/', getPage);
router.post('/', [AuthMiddlewear, Admin, upload.single('image')], post);
router.delete('/:id', [AuthMiddlewear, Admin], delet);
router.get('/:id', get1);

export default router;
