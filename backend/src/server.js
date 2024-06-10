import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { loggerMiddleware } from './middleware/logger.js'
import userRouter from './routes/userRouter.js';
import tweetRouter from './routes/tweetRouter.js';


const PORT = 3001
const MONGO_DB_URL = 'mongodb+srv://harshmaniar18:jIYZ2FvxB7asqSoM@twitterx.jtbulu3.mongodb.net/?retryWrites=true&w=majority&appName=TwitterX'

const app = express()
app.use(express.json());
app.use(cors())
app.use(loggerMiddleware)

async function clearDB()
{
    // Get list of collections
    const collections = await mongoose.connection.db.listCollections().toArray();

    // Iterate over each collection
    for (const collection of collections) {
        // Print the collection name
        console.log(`Collection: ${collection.name}`);

        // Query all documents in the collection
        const documents = await mongoose.connection.db.collection(collection.name).find({}).toArray();

        // Print each document
        documents.forEach((document, index) => {
            console.log(`Document ${index + 1}:`, document);
        });

        // Drop the collection
        await mongoose.connection.db.dropCollection(collection.name);
        console.log(`Dropped collection: ${collection.name}`);
    }

    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed.');
}

async function main()
{
    await mongoose.connect(MONGO_DB_URL).then(() => console.log('Database Connected!'))

    app.use(userRouter);
    app.use(tweetRouter);

    app.get('/', async (req, res) => {
        res.send('Welcome to TwitterX Backend!')
    })

    app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
}

main()
