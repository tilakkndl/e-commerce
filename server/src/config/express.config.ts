import express, {Application, Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';

import userRoute from '@routes/userRoute';
import errorMiddleware from '@middlewares/errorMiddleware';
import {configPassport} from '@config/passport.config'

 export default class ExpressConfig{
    private app: Application;
    constructor(){
        this.app = express();       
    }
  
    public init(){
        this.app.use(express.json());
        this.app.use(morgan("dev"));
        this.app.use(cors({
            origin: ' http://localhost:5173',
            credentials: true,
        }));
        this.app.use(passport.initialize());
        configPassport(passport);
        this.app.use('/api/v1/user', userRoute);
        this.app.use(errorMiddleware);
    }
    public listen(port: number){
        this.app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`);
        });

    }
    

    public testRoute(){
     this.app.get('/', (_req:Request, res: Response)=>{
            res.send('Hello World');
     })
    }

  

    public testMiddleware(){
        this.app.use((req: Request, _res: Response, next: NextFunction)=>{
            console.log('Middleware is working');
            console.log(req.body)
            next();
        })
    }
}


