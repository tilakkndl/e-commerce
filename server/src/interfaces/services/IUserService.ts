import {User} from '@entities/User.entity'
import {CreateUserDto} from '@dtos/userDto'

// export type registerUserProp = Omit<CreateUserDto, "confirmPassword">;
type registerUserReturn = {user: User, token: string};

export interface IUserService {
    loginUser(id: string): Promise<{user: User, token: string}>;
    registerUser: (entity: CreateUserDto) => Promise<registerUserReturn>;
}