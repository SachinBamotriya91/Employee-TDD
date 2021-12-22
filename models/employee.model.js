const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema({
    empId: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
});
const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
module.exports = EmployeeModel;