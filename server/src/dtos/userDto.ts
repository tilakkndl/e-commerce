import { IsUnique } from '@shares/validation/isUniqueConstraint';
import { Match } from '@shares/validation/isMatchConstraint';

import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty, IsOptional, IsIn} from 'class-validator';

export class CreateUserDto{
    @IsNotEmpty({message: "Name is required"})
    @MinLength(3, {message: "Name must be at least 3 characters"})
    @MaxLength(20, {message: "Name must be at most 20 characters"})
    name!: string;

    @IsEmail({}, {message: "Invalid email"})
    @IsUnique({table: 'user', column: 'username'}, )
    username!: string;

    @IsString({message: "Password must be a string"})
    @MinLength(6, {message: "Password must be at least 6 characters"})
    @MaxLength(20, {message: "Password must be at most 20 characters"})
    password!: string;

    @Match('password', {message: 'Passwords do not match'})
    confirmPassword!: string;

    @IsOptional()
    @IsIn(["admin", "customer"], { message: "Role must be either 'admin' or 'customer'" })
    role?: string;

    @IsOptional()
    isOAuth?: boolean;
}

export class LoginUserDto{
    @IsEmail({}, {message: "Invalid email"})
    email!: string;

    @IsString({message: "Password must be a string"})
    @MinLength(6, {message: "Password must be at least 6 characters"})
    @MaxLength(20, {message: "Password must be at most 20 characters"})
    password!: string;
}

