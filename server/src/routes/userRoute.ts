import express from 'express';
import  {UserController}  from '@controllers/userController';
import { UserRepository } from '@repositories/userRepository';
import UserService from '@services/userService';
import passport from 'passport';

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const controller = new UserController(userService);

router.post('/register', controller.createUser.bind(controller));
router.post('/login',passport.authenticate("local", {session: false}), controller.loginUser.bind(controller));

export default router;