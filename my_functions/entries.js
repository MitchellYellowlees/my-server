const dotenv = require('dotenv')

dotenv.config()

const MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectId;
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
    let entryId = commandArray.pop()
    let command = commandArray.pop()

    if (entryId === "create-entry") {
        const newFirst = event.queryStringParameters.firstName
        const newLast = event.queryStringParameters.lastName
        const newProfession = event.queryStringParameters.profession
        const newDate = event.queryStringParameters.date
        const newOwner = event.queryStringParameters.owner

        const newEntry = {
            firstName:newFirst,
            lastName:newLast,
            profession:newProfession,
            date:newDate,
            owner:newOwner,
        }

        await db.collection("entries").insertOne(newEntry)
        //await db.collection("users").updateOne({_id:newOwner}, {$addToSet: {entries: newEntry._id}})
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Credentials': true,
              },
            body: JSON.stringify("New user added successfully"),
        };
        return response;
    }
    else if (command === "get") {
        var o_id = new ObjectId(entryId)
        const result = await db.collection("entries").findOne({_id:o_id})
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                
                'Access-Control-Allow-Credentials': true,
              },
            body: JSON.stringify(result),
        };
        return response;
    }
}