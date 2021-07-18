const User = require('../models/user.model')
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
    let userEmail = commandArray.pop()
    let command = commandArray.pop()

    
    
    if (command === "get-by-email") {
        const result = await db.collection("users").findOne({email: userEmail});
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body:JSON.stringify(result),
        };
        return response;

        
        //GET user via email
    }
    else if (command === "entries-with-email"){
        
        const result =  await db.collection("users").findOne({email: userEmail})
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: JSON.stringify(result.entries),
        };
        return response;
        //GET user entries via email
    }
    else if (userEmail === "create-user") {
        const newMail = event.queryStringParameters.email
        await db.collection("users").insertOne({email: newMail})
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: JSON.stringify("New user added successfully"),
        };
        return response;
        //POST new user
    }
    

}