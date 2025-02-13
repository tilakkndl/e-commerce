import jwt from 'jsonwebtoken';

export class JwtHelper{
    async generateToken(id: number): Promise<string>{

        return jwt.sign({id}, process.env.JWT_SECRET as string, {expiresIn: process.env.JWT_EXPIRES_IN as string});
    }

    async verifyToken(token: string){
        return jwt.verify(token, process.env.JWT_SECRET as string)
    }

} 