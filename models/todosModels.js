const { text } = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todosSchema = new Schema({
    todoData: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
    }
}, {timestamps: true});

// Export 
module.exports = mongoose.model("Todo", todosSchema);