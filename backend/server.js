import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/booksRoute.js';
import path from 'path';

dotenv.config();

const app=express();
const PORT = process.env.PORT || 5000;

const _dirname=path.resolve();

     // Enable CORS for all origins (in production, you'd likely restrict this to specific origins)
     app.use(cors())

     // Or, specify the allowed origin explicitly
     app.use(express.json()) //this middleware allows us to accept JSON data in the body

app.use('/books',router)


    app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        app.listen(PORT,()=>{
            console.log(`Server running at ${PORT}`)
            console.log('Connected to Database')
        })
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);

    }
}
connectDB();







//yadavkrishna28217