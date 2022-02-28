const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./server/db");
// const { application } = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');




//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));


//***ROUTES***

//create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
        [description])

    res.json(newTodo.rows[0])
    } catch (error) {
        console.error(err.message);
    }
});

//get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)

    } catch (error) {
        console.error(err.message)
    }
})

//get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", 
        [id])

        res.json(todo.rows[0])
    } catch (error) {
        console.error(err.message)
    }
})

//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", 
        [description, id])

        res.json("Todo was updated")
    } catch (error) {
        console.error(err.message)
    }
})

//delete a todo
app.delete("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", 
        [id])

        res.json("Todo was Deleted")
    } catch (error) {
        console.error(err.message)
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
	console.log(`Server is running on ${PORT}!`);
})

// 	try {
// 		await client.connect();
// 		console.log('Database is open for business!');
// 	} catch (error) {
// 		console.error('Database is closed for repairs!\n', error);
// 	}
// });

