import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGO_URI is not set in your .env file. The API will not be able to read or write data.');
    return false;
  }
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
    return true;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    return false;
  }
}
