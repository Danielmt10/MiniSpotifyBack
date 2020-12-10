import {Router} from 'express';
import {userController} from '../controllers/UserController';

const router:Router = Router();

router.post("/add", userController.saveUser);
router.post("/find", userController.loginUser);

export default router;