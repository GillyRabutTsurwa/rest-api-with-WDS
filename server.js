const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const databaseURL = "mongodb://127.0.0.1:27017/subscribers"; //IMPORTANT: "monogdb://localhost/subscribers" will not work

mongoose.connect(databaseURL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Successfully Connected to Database"));

app.use(express.json());
// will use router later

// Getting All
app.get("/subscribers", (request, response) => {
    response.send({ message: "Hello World" });
});

// Getting One
app.get("/subscribers/:id", (request, response) => {
    response.send({ name: request.params.id });
});

// Creating One
app.post("/subscribers", (request, response) => {});

// Updating One
app.patch("/subscribers/:id", (request, response) => {});

// Deleting One
app.delete("/subscribers/:id", (request, response) => {});

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});
