import {Repository} from 'typeorm'
import bcrypt from 'bcryptjs';

import {User} from '@entities/User.entity';
import {AppDataSource} from '@config/typeorm.config';
import {IUserRepository} from '@interfaces/repositories/IUserRepository';
import {CreateUserDto} from "@dtos/userDto";



 export  class UserRepository implements IUserRepository{
  private  repository: Repository<User>;
  constructor(){
        this.repository = AppDataSource.getRepository(User);
  }

  public create= async (entity: Omit<CreateUserDto, "confirmPassword">) => {
    // console.log("up to here")
    const res = await this.repository.save(entity);
  
    return res;
        // return await this.repository.save(entity);
    }

    async findOne(id: number): Promise<User> {
        return await this.repository.findOne({where: {id}}) as User;
    }

    async findByUsername(username: string): Promise<User> {
        return await this.repository.findOne({where: {username}}) as User;
    }

     findAll= (async () => {
        return await this.repository.find();
    })

     update= (async (id: number, entity: User) => {
        return await this.repository.update(id, entity) as unknown as User;
    })

    public delete= (async (id: number) => {
         await this.repository.delete(id);
    })

}

export class EncryptDecrypt{
    public static async hashPassword(password: string): Promise<string>{
        return await bcrypt.hash(password, 10);
    }

    public static async comparePassword(password: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(password, hash);
    }
}