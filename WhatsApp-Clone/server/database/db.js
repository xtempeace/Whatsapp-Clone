
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); // initializing dotenv

const USERNAME=process.env.DB_USERNAME
const PASSWORD=process.env.DB_PASSWORD

const Connection = async () => {
    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.qyt6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    //const URL =`mongodb://localhost:27017/`
    try {
       await mongoose.connect(URL, { useNewUrlParser: true});
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;