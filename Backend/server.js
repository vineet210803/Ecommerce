import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';

// App config
const app= express()
const port = process.env.PORT || 3000;
connectDB()

// middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.get('/', (req, res)=>{
   res.send ("api is working")
})

app.listen(port, ()=>console.log('Server is listening on PORT: '+ port))


