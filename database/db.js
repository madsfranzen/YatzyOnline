import { MongoClient } from "mongodb";

import dotenv from 'dotenv'

dotenv.config();

let client;
let database;

const connectToDatabase = async () => {

    if (client && database) {
        return database;
    }

    client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();

    database = client.db(process.env.MONGODB_DATABASE);

    return database;
}


export default connectToDatabase;

