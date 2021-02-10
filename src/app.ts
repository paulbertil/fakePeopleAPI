import dotenv from 'dotenv';
import express, { Application } from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';

const app: Application = express();

// ENV config
dotenv.config()
const db_uri: (string | undefined) = process.env.DB_URI;

// connect to DB
if (db_uri) {
    mongoose.connect(db_uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log('connected to mongodb')
    })
}


// const persons = [
//     { id: 1, name: 'John' },
//     { id: 2, name: 'Maria' },
//     { id: 3, name: 'Josef' },
// ]

// type Person = {
//     id: number;
//     firstName: string;
//     lastName: string;
//     gender: string;
//     jobTitle: string;
//     username: string;
//     password: string;
// }


// Routes
import { peopleRouter } from './routes/people'

// Bodyparser
app.use(json())

// Routes
app.use(peopleRouter)


// Server startup
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Express server running on port ${port}`));
