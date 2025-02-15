import { AppError } from "@utils/appError";
import { NextFunction, Request, Response } from "express";
import passport from "passport";

export class AuthMiddleware {
  static protect(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", { session: false }, (err: any, user: Express.User | undefined, info: { message: any; }) => {

    if(err) return new AppError("Something went wrong", 500);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: info?.message || "Unauthorized: Invalid or missing token",
        });
      }

      req.user = user;
      return next();
    })(req, res, next);
  }
}
