import dotenv from 'dotenv';
import 'reflect-metadata';


import {AppDataSource} from "@config/typeorm.config";
import ExpressConfig from "@config/express.config";


dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

async function startApp(){
    try{
        await AppDataSource.initialize();
        console.log('Database connected');
        const expressConfig = new ExpressConfig();
        expressConfig.init();
        expressConfig.listen(PORT);

    }catch(error){
        console.log('Database connection error', error);
    }
}

startApp()