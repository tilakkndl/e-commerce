import {v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config({path: "./config/config.env"})
console.log(process.env.CLOUDINARY_API_KEY)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


  // exproting
  export default cloudinary;