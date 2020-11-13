const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//Routes
// create
app.post("/todos" , async( req ,res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0])

    } catch (er) {
        console.error(er.message);
        
    }
});

//get

app.get("/todos" , async( req ,res) => {
    try {
        const allTodo = await pool.query("Select * From todo");
        res.json(allTodo.rows)


    } catch (er) {
        console.error(er.message);
        
    }
});

//get a row
app.get("/todos/:id" , async( req ,res) => {
    try {
        const { id } = req.params;
        const Todo = await pool.query("Select * From todo where tid = $1" ,[id]);
        res.json(Todo.rows[0])


    } catch (er) {
        console.error(er.message);
        
    }
});

//update
app.put("/todos/:id" , async( req ,res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("Update todo set description = $1 where tid = $2" ,[description , id]);
        res.json("Edit complete")


    } catch (er) {
        console.error(er.message);
        
    }
});

//delete
app.delete("/todos/:id" , async( req ,res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("Delete From todo where tid = $1" ,[id]);
        res.json("delete Complete")


    } catch (er) {
        console.error(er.message);
        
    }
});


// start server

app.listen(5000 , () => {
    console.log("server started at port 5000");
});

