import {CreateUserDto} from "@dtos/userDto";
import {User} from "@entities/User.entity";

export interface IUserRepository<T=User> {
    create: (entity: CreateUserDto)=> Promise<T>;
    findOne: (id: number) => Promise<T>;
    findByUsername: (username: string) => Promise<T>;
    findAll: () => Promise<T[]>;
    update: (id: number, entity: T ) => Promise<T | null>;
    delete: (id: number) => Promise<void>;
}   