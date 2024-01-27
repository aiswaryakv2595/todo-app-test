import express from 'express'
import dotenv from 'dotenv'
import router from './routes/todoRoutes.js'
import dbConnect from './config/dbConnect.js'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(cors({ credentials: true, origin: process.env.FRONDEND }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 6000

dbConnect()
app.use('/todo',router)
app.listen(PORT,()=>{
console.log(`server connected to ${PORT}`)
})