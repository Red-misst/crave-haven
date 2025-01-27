import { MongoClient, Db } from "mongodb";

type CachedConnection = {
    client: MongoClient | null;
    db: Db | null;
    promise: Promise<{ client: MongoClient; db: Db }> | null;
};

let cachedConnection: CachedConnection = {
    client: null,
    db: null,
    promise: null
};

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = process.env.MONGODB_DB as string;

if (!MONGODB_URI || !MONGODB_DB) {
    throw new Error(
        "Please define MONGODB_URI and MONGODB_DB environment variables in your .env file."
    );
}

async function ensureMongoClientConnected(client: MongoClient): Promise<void> {
    try {
        await client.db().command({ ping: 1 });
    } catch (error) {
        await client.connect();
    }
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
    // Return cached connection if available
    if (cachedConnection.client && cachedConnection.db) {
        await ensureMongoClientConnected(cachedConnection.client);
        return { client: cachedConnection.client, db: cachedConnection.db };
    }

    // Create new connection if none exists
    if (!cachedConnection.promise) {
        cachedConnection.promise = MongoClient.connect(MONGODB_URI)
            .then(async (client) => {
                const db = client.db(MONGODB_DB);
                await ensureMongoClientConnected(client);
                cachedConnection.client = client;
                cachedConnection.db = db;
                return { client, db };
            })
            .catch((err) => {
                console.error("Failed to connect to database", err);
                cachedConnection.promise = null;
                throw err;
            });
    }

    return cachedConnection.promise;
}
