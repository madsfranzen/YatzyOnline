import { MongoClient } from "mongodb";

import dotenv from 'dotenv'

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();
export default mongoClient;