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

