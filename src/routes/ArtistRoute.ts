import {Router} from 'express';
import {artistController} from '../controllers/ArtistController';

const router:Router = Router();

router.get("/", artistController.index);

export default router;