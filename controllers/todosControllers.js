const Todo = require("../models/todosModels");
const mongoose = require("mongoose");


// Get all todos
const getAllTodos = async (req, res) => {
    const allTodos = await Todo.find({}).sort({createdAt: -1}); /* The find method is empty because I want  to return all todos */
    res.status(200).json(allTodos);
};

// Create a new todo
const createTodo = async (req, res) => {
    const {todoData} = req.body;
    try {
        const todo = await Todo.create({todoData});
        res.status(201).json(todo);
    } catch (err){
        res.status(400).json({mssg: err.message});
    };
};

// Get one specific todo
const getTodo = async (req, res) => {
    const {id} = req.params;
    // Check if the id provided is a valid one and has the correct lenght
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such Todo"})
    }
    // Check if the document with the provided id exists in the db
    const todo = await Todo.findById(id); 
    // If todo does't exist return an error
    if(!todo) {
        /* IT'S IMPORTANT TO USE RETURN CAUSE OTHERWISE THE FUNCTION WILL CONTINUE RATHER THAN STOPPING HIS EXECUTION */
        return res.status(404).json({error: "No such Todo."});
    }
    // If everything went well send all the Todo's to the client
    res.status(200).json({todo});
};

// Delete a todo
const deleteTodo = async (req, res) => {
    const {id} = req.params;
    // Check if the id provided is a valid one and has the correct lenght
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such Todo."})
    }
    // If the provided id is valid delete the document where the native "_id" of the document is equal to the provided "id"
    const todo = await Todo.findOneAndDelete({_id: id});
    // Check if todo is true otheriwse return an error
    if(!todo) {
        return res.status(404).json({error: "No such Todo."})
    }
    res.status(200).json({message: "Deleted successfully!", todo})
};

// Update a todo
const updateTodo = async (req, res) => {
    const {id} = req.params;
    // Check if the id provided is a valid one and has the correct lenght
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such Todo"})
    }

    // Check if the Todo exists if yes update the content of the document by spreading the body of the request in it.
    const todo = await Todo.findOneAndUpdate({_id: id}, {...req.body});

    // Check if todo is true otheriwse return an error
    if(!todo) {
        return res.status(400).json({error: "No such Todo."});
    }
    
    res.status(200).json(todo);
};

module.exports = {
    getAllTodos,
    createTodo,
    getTodo,
    deleteTodo,
    updateTodo
}