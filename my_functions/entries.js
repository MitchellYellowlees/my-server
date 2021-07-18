const dotenv = require('dotenv')

dotenv.config()

const MongoClient = require("mongodb").MongoClient;
let cachedDb = null;
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(process.env.CONNECTIONSTRING);
  const db = await client.db('Cluster0');
  cachedDb = db;
  return db
}

exports.handler = async function (event, context) {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await connectToDatabase();

    const commandArray = event.path.split("/")
    let command = commandArray.pop()

    if (command === "create-entry") {
        const newFirst = event.queryStringParameters.firstName
        const newLast = event.queryStringParameters.lastName
        const newProfession = event.queryStringParameters.profession
        const newDate = event.queryStringParameters.date

        const newEntry = {
            firstName:newFirst,
            lastName:newLast,
            profession:newProfession,
            date:newDate,
        }

        await db.collection("entries").insertOne(newEntry)
        //await db.collection("users").updateOne({_id:newOwner}, {$addToSet: {entries: newEntry._id}})
        const response = {
            statusCode: 200,
            body: JSON.stringify("New user added successfully"),
        };
        return response;
    }
}