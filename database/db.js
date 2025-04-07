import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();
export default clientPromise;