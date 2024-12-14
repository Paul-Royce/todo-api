const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
// Import mongoose
const mongoose = require("mongoose");

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const todosRoutes = require("./routes/todosRoutes");
// Use routes
app.use("/api/todos", todosRoutes);


// Connect to the database and listen for request only when connection is successfull.
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    const PORT = process.env.PORT;
    // Listen for request
    app.listen(PORT, () => console.log("Connected to db & listening on port: " + PORT));
})
.catch( e => console.log(e))


