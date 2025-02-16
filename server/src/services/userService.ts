// import fs from 'fs';
import { UserRepository, EncryptDecrypt } from '@repositories/userRepository';
import { CreateUserDto, UpdateUserDto } from '@dtos/userDto';
import { JwtHelper } from "@helpers/jwt.helper";
import { IUserService } from '@interfaces/services/IUserService';
import { User } from '@entities/User.entity';
import catchAsyncGen from '@utils/catchAsyncGen';  
import cloudinary from '@config/cloudinary';

const jwtHelper = new JwtHelper();

export default class UserService implements IUserService {
    private userRepository: UserRepository;
    constructor(userRepo: UserRepository) {
        this.userRepository = userRepo;
    }

    public registerUser = catchAsyncGen(async (entity: CreateUserDto) => {
        const { username, password, name, role = "customer", phoneNumber, address, profileUrl = undefined } = entity;
        const hashedPassword = await EncryptDecrypt.hashPassword(password);
        const user = new User();
        user.name = name;
        user.password = hashedPassword;
        user.username = username;
        user.address = address;
        user.role = role;
        user.phoneNumber = phoneNumber;
        user.profileUrl = profileUrl as string;

        const userCreated = await this.userRepository.create(user);
        const token = await jwtHelper.generateToken(user.id);
        return { user: userCreated, token };
    });

    public loginUser = catchAsyncGen(async (id: string) => {
        const user = await this.userRepository.findOne(Number(id));
        const token = await jwtHelper.generateToken(Number(id));
        return { user, token };
    });

    public updateUser  = catchAsyncGen(async ( entity: UpdateUserDto, authId:string, paramId) => {
        if(Number(paramId) !== Number(authId)) {
            throw new Error("You are not authorized to perform this operation");  
        } 
        const user = await this.userRepository.findOne(Number(paramId));
        const result = await cloudinary.uploader.upload(entity.profileUrl as string, {
            folder: `uploads/${user.name}`, // Cloudinary folder
          });
        //   fs.unlinkSync(entity.profileUrl as string);
          if(!result) throw new Error("Error uploading image");
          const updatedUser = new User();
            updatedUser.name = entity.name || user.name;
            updatedUser.profileUrl = result.secure_url;
            // updatedUser.username = entity.username || user.username;
            updatedUser.phoneNumber = entity.phoneNumber || user.phoneNumber;
            updatedUser.address = entity.address || user.address;
            // updatedUser.role =  user.role;
            // updatedUser.id = Number(id);
            return await this.userRepository.update(Number(paramId), updatedUser);

    })
}
