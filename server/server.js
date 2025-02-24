import app from './app.js'
import dotenv from 'dotenv'
import connectDatabase from './config/database.js'

dotenv.config({path: "./config/config.env"})
const PORT = process.env.PORT
console.log(PORT)

connectDatabase()

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})