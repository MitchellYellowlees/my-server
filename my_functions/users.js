
exports.handler = async function (event, context) {
    const commandArray = event.path.split("/")
    let email = commandArray.pop()
    let command = commandArray.pop()
    
    if (command === "get-by-email") {
        const response = {
            statusCode: 200,
            body: JSON.stringify('Get user with an email'),
        };
        return response;
        //GET user via email
    }
    else if (command === "entries-with-email"){
        const response = {
            statusCode: 200,
            body: JSON.stringify('Get entries with an email'),
        };
        return response;
        //GET user entries via email
    }
    else if (email === "create-user") {
        const response = {
            statusCode: 200,
            body: JSON.stringify('Create User'),
        };
        return response;
        //POST new user
    }
    

}