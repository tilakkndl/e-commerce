import express from 'express';
import  {UserController}  from '@controllers/userController';
import { UserRepository } from '@repositories/userRepository';
import UserService from '@services/userService';
import { AuthMiddleware } from '@middlewares/authMiddleware';
import upload from '@middlewares/uploadMiddleware';



const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const controller = new UserController(userService);

router.post('/register', controller.createUser.bind(controller));
router.post('/login', controller.loginUser.bind(controller));
router.get("/protect", AuthMiddleware.protect, controller.protect.bind(controller));
router.put("/profile/:id", AuthMiddleware.protect, upload.single("image"), controller.updateUser.bind(controller));
export default router;