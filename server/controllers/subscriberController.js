import Subscriber from "../models/subscriberSchema.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";


export const addSubscriber = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const existingSubscriber = await Subscriber.findOne({ email });
  if (existingSubscriber) {
    return next(new AppError("Email is already subscribed", 400));
  }

  const subscriber = await Subscriber.create({ email });

  res.status(201).json({
    success: true,
    message: "Subscribed successfully",
    subscriber,
  });
});

export const unsubscribe = catchAsync(async (req, res, next) => {
  const { email } = req.params;

  const subscriber = await Subscriber.findOne({ email });
  if (!subscriber) {
    return next(new AppError("Subscriber not found", 404));
  }

  await subscriber.deleteOne();

  res.status(200).json({
    success: true,
    message: "Subscriber deleted successfully",
  });
});


export const getSubscribers = catchAsync(async (req, res, next) => {
  const subscribers = await Subscriber.find().select("email subscribedAt");

  res.status(200).json({
    success: true,
    data: subscribers,
  });
});
