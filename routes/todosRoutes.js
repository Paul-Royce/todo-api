const express = require("express");
const router = express.Router();
const {getAllTodos, createTodo, getTodo, updateTodo, deleteTodo} = require("../controllers/todosControllers");


// GET All todos
router.get("/", getAllTodos);

// GET a single todo
router.get("/:id", getTodo);

// Create a new todo
router.post("/", createTodo);

// Delete a todo
router.delete("/:id", deleteTodo);

router.patch("/:id", updateTodo);


module.exports = router;