import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'malik_scrap_db';

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getMongoClient(): Promise<MongoClient | null> {
  if (!uri) {
    return null;
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      if (!global._mongoClientPromise) {
        client = new MongoClient(uri, {
          connectTimeoutMS: 10000,
          serverSelectionTimeoutMS: 10000,
        });
        global._mongoClientPromise = client.connect();
      }
      return await global._mongoClientPromise;
    } else {
      if (!clientPromise) {
        client = new MongoClient(uri, {
          connectTimeoutMS: 10000,
          serverSelectionTimeoutMS: 10000,
        });
        clientPromise = client.connect();
      }
      return await clientPromise;
    }
  } catch (err) {
    console.warn('[MongoDB] Failed to connect to MongoDB Atlas:', (err as Error).message);
    return null;
  }
}

export async function getMongoDb(): Promise<Db | null> {
  try {
    const c = await getMongoClient();
    if (!c) return null;
    return c.db(dbName);
  } catch (err) {
    console.warn('[MongoDB] Error getting database handle:', (err as Error).message);
    return null;
  }
}

