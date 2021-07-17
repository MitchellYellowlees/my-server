exports.handler = async function (event, context) {
    let command = event.path.split("/").pop()
    if (command === "create-entry") {
        return {message: "create-entry message"}
        //POST new netry
        //UPDATE add entry to owner's entries[]
    }
}