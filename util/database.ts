import { MongoClient, Db } from 'mongodb'

const url = 'mongodb+srv://sophiecode:1234@cluster0.initq.mongodb.net/?retryWrites=true&w=majority'
let connectDB: Promise<MongoClient>;

declare global {
    var _mongo: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
        global._mongo = new MongoClient(url).connect()
    }
    connectDB = global._mongo
} else {
    connectDB = new MongoClient(url).connect()
}
export {connectDB}




