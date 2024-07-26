import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect(DB_NAME) {
    try {
        await connect(MONGODB_URI, {
            dbName: DB_NAME,
        });
        console.log(`Pinged your deployment. You successfully connected to ${DB_NAME} DB!`);
    } catch (error) {
        console.log(`ERROR connecting to ${DB_NAME} DB`,error);
        throw error;
    }
}
export default dbConnect;

