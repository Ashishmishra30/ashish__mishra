const express = require('express');
const { connection } = require("./db");
const { Searchrouter } = require('./routes/Search.route');
const cors= require("cors");


const app = express();
app.use(cors());
app.use(express.json())


app.get("/", (req, ser) => {
    res.send("Home Page")
})

app.use("/",Searchrouter)

app.listen(4500, async () => {
    try {
        await connection
        console.log("Connected to mongodb")
    } catch (error) {
        console.log(error)
        console.log("Something went wrong to the db")
    }
    console.log("Server is running")
})