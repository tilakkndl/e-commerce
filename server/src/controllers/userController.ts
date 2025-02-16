import { NextFunction, Request, Response } from 'express'
import {IUserService} from "@interfaces/services/IUserService"
import UserService from '@services/userService';
import { CreateUserDto } from '@dtos/userDto';
import { RequestValidator } from '@utils/requestValidation';
import { AppError } from '@utils/appError';
import {catchAsync} from '@utils/catchAsync';
import passport from 'passport';

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
loginUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", { session: false }, async (err: any, user: any, info: any) => {
      if (err) return next(new AppError("Something went wrong during authentication", 500));
      
      if (!user) {
          return next(new AppError(info?.message || "Invalid username or password", 401));
      }

      try {
          const userData = await this.userService.loginUser(user.id);
          // res.cookie('accessToken', userData.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 * Number(process.env.COOKIE_EXPIRE) });

          res.status(200).json({
              success: true,
              message: "User logged in successfully",
              data: { ...userData.user, password: undefined,   token: userData.token },
          });
      } catch (error) {
          next(new AppError("Login process failed", 500));
      }
  })(req, res, next); 
};

 // eslint-disable-next-line @typescript-eslint/no-unused-vars
protect = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  console.log(req.user);
  res.status(200).json({ success: true, message: "Protected route" });

})
}

