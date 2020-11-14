import React, { Fragment ,useEffect,useState } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {

    const [todo , setTodo] = useState([]);

    //Delete Function:
    const DeleteRow = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {method : "DELETE"});
            console.log(deleteTodo);
            setTodo(todo.filter(todos => todos.tid !== id));
            
        } catch (err) {
            console.error(err.message);
        }
    };

    // List All Function
    const getTodo = async() =>{
        try {
            const response = await fetch("http://localhost:5000/todos");
            const data = await response.json();
            setTodo(data);
            
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodo();
    },[] );

    console.log(todo);
    return (
        <Fragment>
            <table class="table table-hover mt-5 text-center">
                <thead>
                    <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Edit </th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todo.map(todos =>(
                        <tr key={todos.tid}>
                            <td>{todos.description} </td>
                            <td><EditTodo todo = {todos}> </EditTodo></td>
                            <td><button className="btn btn-danger" onClick={() => DeleteRow(todos.tid)} >Delete</button></td>
                        </tr>
                    ))}
                    {/*
                        <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    */}
                    
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodo;