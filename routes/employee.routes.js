const express = require("express");
const employeeController = require("../controllers/employee.controller");
const router = express.Router();

router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getEmployees);
router.get("/:Id", employeeController.getEmployeeById);
router.put("/:Id", employeeController.updateEmployee);
router.delete("/:Id", employeeController.deleteEmployee);
module.exports = router;