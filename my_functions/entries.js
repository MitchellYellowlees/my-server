exports.handler = async function (event, context) {
    let command = event.path.split("/").pop()
    if (command === "create-entry") {
        const response = {
            statusCode: 200,
            body: JSON.stringify('Create entry'),
        };
        return response;
        //POST new netry
        //UPDATE add entry to owner's entries[]
    }
}