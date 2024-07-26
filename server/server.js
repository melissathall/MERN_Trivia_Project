import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import router from './routes/trivia.routes.js';

//middleware - express parses body information into JSON
const app = express();
app.use(express.json(), cors()); //cors Cross Origin Resource Sharing

//env vars
dotenv.config();
const PORT = process.env.PORT;

//db connection
dbConnect("triviaProjDB"); 

//routes
app.use('/api', router);

app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);