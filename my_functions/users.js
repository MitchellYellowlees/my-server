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
            body:JSON.stringify(result),
        };
        return response;

        
        //GET user via email
    }
    else if (command === "entries-with-email"){
        //NOT YET WORKING
        const result =  await db.collection("users").find({email: userEmail}, {email:0})
        const response = {
            statusCode: 200,
            body: JSON.stringify(result),
        };
        return response;
        //GET user entries via email
    }
    else if (userEmail === "create-user") {
        await db.collection("users").insertOne({email:event["email"]})
        const response = {
            statusCode: 200,
            body: JSON.stringify(event["email"]),
        };
        return response;
        //POST new user
    }
    

}