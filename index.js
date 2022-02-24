const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./server/db");

//middleware
app.use(cors());
app.use(express.json());

//**ROUTES

//create a todo

//get all todos

//get a todo

//update a todo

//delete a todo

app.listen(3000, () => {
    console.log("server has started on port 3000")
});