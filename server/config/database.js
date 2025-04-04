
import mongoose from "mongoose"



const connectDatabase = ()=>{

    const DBUrl = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD)

    mongoose.connect(DBUrl, {
    }).then((data)=>{
        console.log(`Database connected at server ${data.connection.host}`)
    })
    .catch((err)=>{
        console.log(err)
    })
}

export default connectDatabase

//checking the connection