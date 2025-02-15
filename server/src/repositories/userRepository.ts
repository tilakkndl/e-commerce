import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';

import { User } from '@entities/User.entity';
import { AppDataSource } from '@config/typeorm.config';
import { IUserRepository } from '@interfaces/repositories/IUserRepository';
import catchAsyncGen from '@utils/catchAsyncGen';  // Import the catchAsyncGen

export class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    public create = catchAsyncGen(async (user: User): Promise<User> => {
        return await this.repository.save(user);
    });

    public findOne = catchAsyncGen(async (id: number): Promise<User> => {
        return await this.repository.findOne({ where: { id } }) as User;
    });

    public findByUsername = catchAsyncGen(async (username: string): Promise<User> => {
        return await this.repository.findOne({ where: { username } }) as User;
    });

    public findAll = catchAsyncGen(async (): Promise<User[]> => {
        return await this.repository.find();
    });

    public update = catchAsyncGen(async (id: number, entity: User): Promise<User> => {
        await this.repository.update(id, entity);
        return this.findOne(id);  // Optionally return the updated user after update operation
    });

    public delete = catchAsyncGen(async (id: number): Promise<void> => {
        await this.repository.delete(id);
    });
}

export class EncryptDecrypt {
    public static hashPassword = catchAsyncGen(async (password: string): Promise<string> => {
        return await bcrypt.hash(password, 10);
    });

    public static comparePassword = catchAsyncGen(async (password: string, hash: string): Promise<boolean> => {
        return await bcrypt.compare(password, hash);
    });
}