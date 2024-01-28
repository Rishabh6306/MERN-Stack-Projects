import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbApi = process.env.MONGODB_URI || 'mongodb://localhost:27017/filesharing';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbApi);
   console.log('Database connection established');
  } catch (error) {
    console.log('Error connecting to database');
  }
};

export default connectToDatabase;