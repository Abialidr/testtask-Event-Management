import express from 'express';
const router = express.Router();
import { postUser, postAuth, getCurentUSer } from '../Controller/User';

router.post('/getCurrentUSer', getCurentUSer);
router.post('/', postUser);
router.post('/auth', postAuth);

export default router;
