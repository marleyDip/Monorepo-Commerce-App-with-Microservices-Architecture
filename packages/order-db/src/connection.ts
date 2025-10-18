import mongoose from "mongoose";

let isConnected = false;

export const connectOrderDB = async () => {
  const MongoUrl = process.env.MONGO_URl;

  if (isConnected) return;

  if (!MongoUrl) {
    throw new Error("MONGO_URl is not defined in env file!");
  }

  try {
    await mongoose.connect(MongoUrl);
    isConnected = true;
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.log("MongoDB connection failed:", err);
    throw err;
  }
};

/* 🧩 Line-by-line breakdown
import mongoose from "mongoose";

Imports the Mongoose library — the official MongoDB ODM (Object Data Modeling) library for Node.js.
It’s used to connect to MongoDB and define models.

let isConnected = false;

This creates a module-level variable to track whether your app is already connected to MongoDB.
Initially, it’s false.
Once a successful connection is made, you set it to true.

This prevents multiple database connections from being created when connectOrderDB() is called multiple times (for example, during API requests or in serverless functions).

export const connectOrderDB = async () => { ... }

Defines an async function that tries to connect to MongoDB and exports it for use in other files.

const MongoUrl = process.env.MONGO_URl;

Reads the connection string from your .env file.
For example:
MONGO_URl=mongodb://localhost:27017/orderDB

if (isConnected) return;

This is a smart optimization ✅
If your app already has an active MongoDB connection, it returns immediately without trying to reconnect.

That prevents warnings like:

MongooseError: Cannot open a new connection since a connection is already established.

if (!MongoUrl) { throw new Error(...); }

Checks that the MONGO_URl variable actually exists.
If it’s missing, it throws an error so you know you misconfigured your environment.

await mongoose.connect(MongoUrl);

Actually connects to MongoDB using the URL from your .env.

This returns a Promise, and await ensures the connection completes before moving on.

isConnected = true;

Marks that the connection was successful ✅
So any future calls to connectOrderDB() will skip re-connecting.

console.log("Connected to MongoDB successfully");

Just logs a confirmation message.

catch (err) { ... }

If anything goes wrong (wrong URL, network issue, MongoDB not running), it:
Logs the error message
Re-throws the error so your app knows something failed

🧠 Why this version is better
    Feature	                   Benefit
    isConnected flag	  Prevents multiple connections (especially in serverless / microservice setups)
    .env validation	 Catches misconfigurations early
    try/catch	               Safe error handling
    Clean async/await style	Easier to read and debug
*/
