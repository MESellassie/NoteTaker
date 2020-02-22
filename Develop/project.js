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

// api call for the notes that sends the data to the browser as an array
app.get("/api/notes", function(err, res){
    try {
        notePad = fs.readFileSync("Develop/db/db.json");
        console.log("alert");
        notePad = JSON.parse(notePad);
    } catch(err) {
        console.log(err);
    }
    res.json(notePad);
});

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