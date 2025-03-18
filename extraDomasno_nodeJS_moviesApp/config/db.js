import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DATABASE } =
  process.env;
const requiredEnvVariables = [
  "MONGO_USERNAME",
  "MONGO_PASSWORD",
  "MONGO_CLUSTER",
  "MONGO_DATABASE",
];
const missingEnvVars = requiredEnvVariables.filter(
  (envVar) => !process.env[envVar]
);
if (missingEnvVars.length > 0) {
  console.error(
    "Missing requred environment variables:",
    missingEnvVars.join(",")
  );
  process.exit(1);
}
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(MONGO_URI);
let db = null;
export async function connectDB() {
  try {
    const connection = await client.connect();
    db = connection.db();
    console.log("Connected to MongoDB successfully");
    // console.log("Database object: ", db);
  } catch (error) {
    console.error("MogoDb connection error:", error);
    process.exit(1);
  }
}
export function getDb() {
  if (!db) {
    console.error("Database not initialized:");
  }
  return db;
}