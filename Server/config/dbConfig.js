import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const connectionStr = `${process.env.MONGODB_URI}`;

  await mongoose.connect(connectionStr);

  return mongoose.connection;
};

export default connectToDatabase;
