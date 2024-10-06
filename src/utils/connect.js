import mongoose from "mongoose";

export const connectDatabase = async () => {
  return mongoose.connect(process.env.DATABASE_URL).catch((error) => {
    console.error(`Error connecting to databases ${error.message}`);
    process.exit(1);
  });
};
