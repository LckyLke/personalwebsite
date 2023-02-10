import mongoose from "mongoose";
const MONGO_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);

    if (connection) {
      console.log("MongoDB connected");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;
