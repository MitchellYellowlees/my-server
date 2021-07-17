
exports.handler = async function (event, context) {
    let email = event.path.split("/").pop()
    let command = event.path.split("/").pop()
    if (command === "get-by-email") {
        return {message: "user by email message"}
        //GET user via email
    }
    else if (command === "entries-wth-email"){
        return {message: "entry by email message"}
        //GET user entries via email
    }
    else if (email === create-user) {
        return {message: "create user message"}
        //POST new user
    }

}