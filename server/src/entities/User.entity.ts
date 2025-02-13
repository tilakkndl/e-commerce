import { IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, Index, 
 } from 'typeorm';
 import { IsUnique } from '@shares/validation/isUniqueConstraint';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    
    @Column()  // Assuming username should be unique like email
    @Index({ unique: true })
    @IsUnique({ table: 'User', column: 'username' })
    @IsEmail()
    username!: string;           // Email or username

    @Column({ nullable: true })  // Optional password
    password?: string;

    @CreateDateColumn()
    createdDate!: Date

    @Column({ default: "customer"})
    role!: string;

    @Column({ default: false })
    isOAuth!: boolean;

    @Column({nullable: true})   // Optional
    githubId?: string;

    @Column({nullable: true})   // Optional
    googleId?: string;
}


