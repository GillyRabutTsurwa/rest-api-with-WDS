const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const databaseURL = "mongodb://127.0.0.1:27017/subscribers"; //IMPORTANT: "monogdb://localhost/subscribers" will not work

mongoose.connect(databaseURL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Successfully Connected to Database"));

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});
