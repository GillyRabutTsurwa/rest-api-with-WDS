const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const databaseURL = "mongodb://127.0.0.1:27017/subscribers"; //IMPORTANT: "monogdb://localhost/subscribers" will not work

const Subscriber = require("./models/subscribers");

mongoose.connect(databaseURL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Successfully Connected to Database"));

app.use(express.json());
// will use router later

// Getting All
app.get("/subscribers", async (request, response) => {
    try {
        const subscribers = await Subscriber.find();
        response.json(subscribers);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

// Getting One
app.get("/subscribers/:id", (request, response) => {
    response.send({ name: request.params.id });
});

// Creating One
app.post("/subscribers", async (request, response) => {
    const subscriber = new Subscriber({
        name: request.body.name,
        subscribedToChannel: request.body.subscribedToChannel,
    });

    try {
        /**
         * NOTE:
         * i do this part differently from Kyle
         * he just has const newSubscriber = await subsciber.save()
         * to use the Model.create() which performs .save() implicitly
         * i will post the link to the stackoverflow link which led me to do this in the next commit or two
         */
        const newSubscriber = await Subscriber.create(subscriber);
        /**
         * the code above is this behind the scenes:
         * const newSubscriber = new Subscriber.create(subscriber).save();
         */
        console.log(newSubscriber);
        response.status(201).json(newSubscriber);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});

// Updating One
app.patch("/subscribers/:id", (request, response) => {});

// Deleting One
app.delete("/subscribers/:id", (request, response) => {});

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});
