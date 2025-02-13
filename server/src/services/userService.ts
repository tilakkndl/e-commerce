import {UserRepository, EncryptDecrypt} from '@repositories/userRepository';
import { CreateUserDto } from '@dtos/userDto';
import {JwtHelper} from "@helpers/jwt.helper"
import {IUserService, } from '@interfaces/services/IUserService'

const jwtHelper = new JwtHelper();

export default class UserService implements IUserService {
    private userRepository: UserRepository;
    constructor(userRepo: UserRepository) {
        this.userRepository = userRepo;
    }

    public registerUser = async (entity: CreateUserDto) => {
        const { username, password, name, role="customer"  } = entity;
        const hash = await EncryptDecrypt.hashPassword(password);
        const user = await this.userRepository.create({ name, password: hash, username, role });
        const token = await jwtHelper.generateToken(user.id);
        return { user, token };
    }

    public loginUser = async (id: string) => {
        const user = await this.userRepository.findOne(Number(id));
        const token = await jwtHelper.generateToken(Number(id));
        return { user, token}
    };
}