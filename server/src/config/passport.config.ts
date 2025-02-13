import {PassportStatic} from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import {UserRepository} from '@repositories/userRepository'
import {EncryptDecrypt} from '@repositories/userRepository';
import { User } from '@entities/User.entity';

export const configPassport = (passport: PassportStatic) => {

    const userRepository  = new UserRepository();
    const jwtSecret = process.env.JWT_SECRET as string;
passport.use(new LocalStrategy(async (username, password, done)=>{

    const user: User = await userRepository.findByUsername(username);
    if(!user) return done(null, false, {message: "Invalid username or password"});
    const isMatch = await EncryptDecrypt.comparePassword(password, user.password as string);
    if(!isMatch) return done(null, false, {message: "Invalid username or password"});
    return done(null, user);
}))

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
}, async(payload, done)=>{
    const user = await userRepository.findOne(payload.id);
    if(!user) return done(null, false, {message: "Invalid token"});
    return done(null, user);
}))

}