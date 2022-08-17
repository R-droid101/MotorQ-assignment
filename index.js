const express = require('express');
const registerRoute = require('./routes/register');
const cancelRoute = require('./routes/cancel');

const app = express();

let events = [
    {
        id: 1,
        name: "Frontend", 
        capacity: 50,
        avail: 50,
        date: 28,
        start: "0400",
        end: "0700"
    },
    
    {
        id: 2,
        name: "Backend", 
        capacity: 50,
        avail: 50,
        date: 25,
        start: "1630",
        end: "1930"
    },
    {
        id: 3,
        name: "ML", 
        capacity: 50,
        avail: 50,
        date: 25,
        start: "1630",
        end: "1930"
    },
    {
        id: 4,
        name: "Security", 
        capacity: 50,
        avail: 50,
        date: 26,
        start: "1000",
        end: "1300"
    },
    {
        id: 5,
        name: "DevOps", 
        capacity: 50,
        avail: 50,
        date: 27,
        start: "1500",
        end: "1800"
    },
    {
        id: 6,
        name: "Product Management", 
        capacity: 50,
        avail: 50,
        date: 27,
        start: "1900",
        end: "2000"
    },
];

let participants = [
    {
        id: 0,
        name: "sample",
        priority: 1,
        events: ["Product Management", "Backend"]
    }
];

let waitList = [
    {
        pid: 0,
        name: "sample",
        event: "Sample",
        priority: 1
    }
];

app.get("/", (req, res) => {
    res.send("Welcome to the event");
});

app.use("/register", registerRoute);

app.use("/cancel", cancelRoute);