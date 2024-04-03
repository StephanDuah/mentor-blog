import mongoose from "mongoose";

const DATABASE_URL = process.env.DBURL;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      dbName: "blog",
    };
    cached.promised = await mongoose.connect(DATABASE_URL, opts);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

const db = { connect };
export default db;
