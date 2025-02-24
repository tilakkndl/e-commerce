import jwt from 'jsonwebtoken';
import { promisify } from 'util';
// import crypto from 'crypto';

import User from '../models/userSchema.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber
  });



  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: {
    name: newUser.name,
    username: newUser.username,
    role: newUser.role,
    address: newUser.address,
    phoneNumber: newUser.phoneNumber

    }
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { password, username } = req.body;

  //1) Check if email and password exist
  if (!password || !username) {
    return next(new AppError('Please provide username and password', 400));
  }

  //2) Check if user exists && password is correct
  const user = await User.findOne({ username }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }
  //3) If everything is ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        name: user.name,
        username: user.username,
        role: user.role,
        address: user.address,
        phoneNumber: user.phoneNumber
      }
    }
  });
});

export const protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check of its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in .Please log in to get access', 401)
    );
  }
  //2) Verfication token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('The user belonging to this token does not exist', 401)
    );
  }

//   //4) Check if user changed after the token was issued
//   if (freshUser.changePasswordAfter(decoded.iat)) {
//     return new AppError(
//       'User recently changed password. Please log in again.',
//       401
//     );
//   }
  //GRAND ACCESS TO THE PROTECTED ROUTE
  req.user = freshUser;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this task', 403)
      );
    }
    next();
  };
};