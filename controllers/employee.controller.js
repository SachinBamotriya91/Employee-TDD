const EmployeeModel = require("../models/employee.model");

exports.createEmployee = async(req, res, next) => {
    try {
        const createdModel = await EmployeeModel.create(req.body);
        res.status(201).json(createdModel);
    } catch (err) {
        next(err);
    }
};


exports.getEmployees = async(req, res, next) => {
    try {
        const allEmployees = await EmployeeModel.find({});
        res.status(200).json(allEmployees);
    } catch (err) {
        next(err);
    }
};

exports.getEmployeeById = async(req, res, next) => {
    try {
        const employeeModel = await EmployeeModel.findById(req.params.Id);
        if (employeeModel) {
            res.status(200).json(employeeModel);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};


exports.updateEmployee = async(req, res, next) => {
    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            req.params.Id,
            req.body
        );
        if (updatedEmployee) {
            res.status(200).json(updatedEmployee);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};
exports.deleteEmployee = async(req, res, next) => {
    try {
        const deletedEmployee = await EmployeeModel.findByIdAndDelete(req.params.Id);
        if (deletedEmployee) {
            res.status(200).json(deletedEmployee);
        } else {
            res.status(404).send("deleted successfully");
        }
    } catch (err) {
        next(err);
    }
};