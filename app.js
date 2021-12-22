const express = require('express');
const app = express();
const mongodb = require("./mongodb/mongodb.connect");
const employeeRoutes = require("./routes/employee.routes");

mongodb.connect();

app.use(express.json());
app.use("/employee", employeeRoutes);
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});

app.get("/", (req, res) => {
    res.json("Hello World");
});

module.exports = app;