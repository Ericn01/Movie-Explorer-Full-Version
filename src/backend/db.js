import { MongoClient } from 'mongodb';

const dbConnectionUri = process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParse: true,
}
let client;
let clientPromise;
if (!dbConnectionUri){
    throw new Error("No URI connection string added...");
}
