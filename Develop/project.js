// Required npm libraries
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the express server
const app = express();
// Used to assign the server to the first open port or the default port
const PORT = process.env.PORT || 8080;

// Establishes the notePad variable as an array
let notePad = [];

// Sets up the Express app to handle data parsing aka, allows for use of POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "Develop/public")));

// api call that reads the db.json file and returns all saved notes as JSON.
app.get("/api/notes", function(err, res){
    try {
        // read the JSON file
        notePad = fs.readFileSync("Develop/db/db.json");
        console.log("alert");
        notePad = JSON.parse(notePad);
    } catch(err) {
        console.log(err);
    }
    res.json(notePad);
});

// WRITE NOTES - api call that receives a new note to save on the request body, adds it to the db.json file, and then returns the new note to the client.
app.post("/api/notes", function(req, res) {
    try {
        notePad = fs.readFileSync("Develop/db/db.json");
        console.log(notePad);
        // Used to ensure we get an array
        notePad = JSON.parse(notePad);
        // setting what is required of the user
        req.body.id = notePad.length;
        notePad.push(req.body);
        // return the data to a string
        notePad = JSON.stringify(notePad);
        fs.writeFile("./Develop/db/db.json", notePad, function(err) {
        if (err) throw err;
        });
        res.json(JSON.parse(notePad));

    } catch(err) {
        throw err;
    }
    
});

// DELETE NOTE - Receives the query parameter containing the id of a note to delete.
app.delete("/api/notes/:id", function(req, res){
    try {
        notePad = fs.readFileSync("Develop/db/db.json");
        notePad = JSON.parse(notePad);
        // using the filter function here, I can remove the old notes from the array
        notePad = notePad.filter(function(note){
            return note.id != req.params.id;
        });
        notePad = JSON.stringify(notePad);
        fs.writeFile("./Develop/db/db.json", notePad, function(err) {
        if (err) throw err;
    });
    res.send(JSON.parse(notePad));

} catch(err) {
    throw err;
}

});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});
app.get("/api/notes", function(req, res){
    return res.sendFile(path.join(__dirname, "Develop/db/db.json"));
});

app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});
