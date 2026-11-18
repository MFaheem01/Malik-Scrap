import { MongoClient, Db } from 'mongodb';

const DEFAULT_URI = 'mongodb+srv://malikscrapdealer11_db_user:aT52VKvNYflFKwya@malikscrap.euydnfs.mongodb.net/?retryWrites=true&w=majority';
const DEFAULT_DB = 'malik_scrap_db';

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getMongoClient(): Promise<MongoClient | null> {
  const uri = process.env.MONGODB_URI || DEFAULT_URI;
  if (!uri) return null;

  try {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, {
        connectTimeoutMS: 10000,
        serverSelectionTimeoutMS: 10000,
      });
      global._mongoClientPromise = client.connect().catch((err) => {
        global._mongoClientPromise = undefined;
        throw err;
      });
    }
    return await global._mongoClientPromise;
  } catch (err) {
    global._mongoClientPromise = undefined;
    console.warn('[MongoDB] Failed to connect to MongoDB Atlas:', (err as Error).message);
    return null;
  }
}

export async function getMongoDb(): Promise<Db | null> {
  try {
    const c = await getMongoClient();
    if (!c) return null;
    const dbName = process.env.MONGODB_DB || DEFAULT_DB;
    return c.db(dbName);
  } catch (err) {
    console.warn('[MongoDB] Error getting database handle:', (err as Error).message);
    return null;
  }
}

