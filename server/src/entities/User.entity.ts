import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, Index, UpdateDateColumn, 
 } from 'typeorm';
 import { IsUnique } from '@shares/validation/isUniqueConstraint';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column()
    @IsNotEmpty()
    // @IsPhoneNumber("NP") // Adjust country code as needed
    phoneNumber!: string;

    @Column({ nullable: true })
    profileUrl?: string;
    
    @Column()  // Assuming username should be unique like email
    @Index({ unique: true })
    @IsUnique({ table: 'User', column: 'username' })
    @IsEmail()
    username!: string;           // Email or username

    @Column({ nullable: true })  // Optional password
    password?: string;


    @Column({ default: "customer"})
    role!: string;

    @CreateDateColumn()
    createdDate!: Date

    @UpdateDateColumn()
    updatedDate!: Date

    @Column({ default: false })
    isOAuth!: boolean;

    @Column({nullable: true})   // Optional
    githubId?: string;

    @Column({nullable: true})   // Optional
    googleId?: string;
}


