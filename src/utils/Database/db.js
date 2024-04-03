import mongoose from "mongoose";

const connection = {};
const DB_url = process.env.DBURL;
async function connect() {
  if (connection.isConnected) {
    console.log("already connected");

    return;
  }

  if (mongoose.connection.length > 0) {
    connection.isConnected = mongoose.connection[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }

    await mongoose.disconnect();
  }

  const db = await mongoose.connect(DB_url, {
    dbName: "blog",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connected");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updateAt = doc.updateAt.toString();

  return doc;
}

const db = { connect, disconnect, convertDocToObj };

export default db;
