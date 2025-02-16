import { UserRepository, EncryptDecrypt } from '@repositories/userRepository';
import { CreateUserDto } from '@dtos/userDto';
import { JwtHelper } from "@helpers/jwt.helper";
import { IUserService } from '@interfaces/services/IUserService';
import { User } from '@entities/User.entity';
import catchAsyncGen from '@utils/catchAsyncGen';  

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
}
