import { NextFunction, Request, Response } from 'express'
import {IUserService} from "@interfaces/services/IUserService"
import UserService from '@services/userService';
import { CreateUserDto } from '@dtos/userDto';
import { RequestValidator } from '@utils/requestValidation';
import { AppError } from '@utils/appError';
import {catchAsync} from '@utils/catchAsync';

export class UserController {
    private userService: IUserService;
    constructor(userService: UserService) {
        this.userService = userService;
    }

    createUser=catchAsync(async (req: Request, res: Response, next: NextFunction)=> {
      const {errors} = await RequestValidator(CreateUserDto, req.body);
      if(errors) {
        return next(new AppError(errors as string, 400));
      }
       
      const user = await this.userService.registerUser(req.body satisfies CreateUserDto);
      res.cookie('accessToken', user.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 * Number(process.env.COOKIE_EXPIRE) });
       res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {...user.user, password: undefined},
      });
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginUser=catchAsync(async (req: Request, res: Response, _next: NextFunction)=> {
    const { id } = req.user as {id: string};
    const user = await this.userService.loginUser(id);
    res.cookie('accessToken', user.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 * Number(process.env.COOKIE_EXPIRE) });
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {...user.user, password: undefined},
    });
  })
}
