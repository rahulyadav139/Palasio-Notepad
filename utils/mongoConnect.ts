import mongoose from 'mongoose';

export const mongoConnect = async (): Promise<object> => {
  const uri = process.env.MONGO_URI!;
  return mongoose.connect(uri);
};
