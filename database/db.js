import { MongoClient } from "mongodb";

import dotenv from 'dotenv'

dotenv.config();

let client;
let db;


const connectToDatabase = () => {}


const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();
export default mongoClient;