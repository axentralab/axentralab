const mongoose = require('mongoose');

const connectDB = async () => {
  // If MONGO_URI is not set, skip DB connection (development mode)
  if (!process.env.MONGO_URI) {
    console.log('⚠️  MONGO_URI not set - DB connection skipped (development mode)');
    return;
  }
  
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB error: ${err.message}`);
    // Don't exit in development, just warn
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
