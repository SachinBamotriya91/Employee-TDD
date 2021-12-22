const EmployeeController = require("../../controllers/employee.controller");
const EmployeeModel = require("../../models/employee.model");
const httpMocks = require("node-mocks-http");
const newEmployee = require("../mock-data/new-employee.json");

const allEmployees = require("../mock-data/All-employees.json");

//jest.mock(".../");
EmployeeModel.create = jest.fn();
EmployeeModel.find = jest.fn();
EmployeeModel.findById = jest.fn();
EmployeeModel.findByIdAndUpdate = jest.fn();
EmployeeModel.findByIdAndDelete = jest.fn();

let req, res, next;
const EmployeeId = "61c2d40c645b34879dc08a68";
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("EmployeeController.createEmployee", () => {
    beforeEach(() => {
        req.body = newEmployee;
    });

    it("should have a createEmployee function", () => {
        expect(typeof EmployeeController.createEmployee).toBe("function");
    });

    it("should call EmployeeModel.create", () => {
        EmployeeController.createEmployee(req, res, next);
        expect(EmployeeModel.create).toBeCalledWith(newEmployee);
    });

    it("should return 201 response code", async() => {
        await EmployeeController.createEmployee(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("should return json body in response", async() => {
        EmployeeModel.create.mockReturnValue(newEmployee);
        await EmployeeController.createEmployee(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newEmployee);
    });
    it("should handle errors", async() => {
        const errorMessage = { message: "empId property is not exist" };
        const rejectedPromise = Promise.reject(errorMessage);
        EmployeeModel.create.mockReturnValue(rejectedPromise);
        await EmployeeController.createEmployee(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });


    describe("EmployeeController.deleteEmployee", () => {
        it("should have a deleteEmployee function", () => {
            expect(typeof EmployeeController.deleteEmployee).toBe("function");
        });
        it("should call findByIdAndDelete", async() => {
            req.params.Id = EmployeeId;
            await EmployeeController.deleteEmployee(req, res, next);
            expect(EmployeeModel.findByIdAndDelete).toBeCalledWith(EmployeeId);
        });
        it("should return 200 OK and deleted todomodel", async() => {
            EmployeeModel.findByIdAndDelete.mockReturnValue(newEmployee);
            await EmployeeController.deleteEmployee(req, res, next);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toStrictEqual(newEmployee);
            expect(res._isEndCalled()).toBeTruthy();
        });
        it("should handle errors", async() => {
            const errorMessage = { message: "Error deleting" };
            const rejectedPromise = Promise.reject(errorMessage);
            EmployeeModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
            await EmployeeController.deleteEmployee(req, res, next);
            expect(next).toHaveBeenCalledWith(errorMessage);
        });
        it("should handle 404", async() => {
            EmployeeModel.findByIdAndDelete.mockReturnValue(null);
            await EmployeeController.deleteEmployee(req, res, next);
            expect(res.statusCode).toBe(404);
            expect(res._isEndCalled()).toBeTruthy();
        });
    });


    describe("EmployeeController.getEmployees", () => {
        it("should have a getEmployees function", () => {
            expect(typeof EmployeeController.getEmployees).toBe("function");
        })
        it("should call EmployeeModel.find({})", async() => {
            await EmployeeController.getEmployees(req, res, next);
            expect(EmployeeModel.find).toBeCalledWith({});
        });

        it("should return response with status 200 and all todos", async() => {
            EmployeeModel.find.mockReturnValue(allEmployees);
            await EmployeeController.getEmployees(req, res, next);
            expect(res.statusCode).toBe(200);
            expect(res._isEndCalled()).toBeTruthy();
            expect(res._getJSONData()).toStrictEqual(allEmployees);
        });
        it("should handle errors in getTodos", async() => {
            const errorMessage = { message: "Error finding" };
            const rejectedPromise = Promise.reject(errorMessage);
            EmployeeModel.find.mockReturnValue(rejectedPromise);
            await EmployeeController.getEmployees(req, res, next);
            expect(next).toHaveBeenCalledWith(errorMessage);
        });

        it("should return 404 when item doesnt exist", async() => {
            EmployeeModel.findById.mockReturnValue(null);
            await EmployeeController.getEmployeeById(req, res, next);
            expect(res.statusCode).toBe(404);
            expect(res._isEndCalled()).toBeTruthy();
        });

    });

    describe("EmployeeController.getEmployeeById", () => {
        it("should have a getEmployeeById", () => {
            expect(typeof EmployeeController.getEmployeeById).toBe("function");
        });
        it("should call EmployeeModel.findById with route parameters", async() => {
            req.params.Id = EmployeeId;
            await EmployeeController.getEmployeeById(req, res, next);
            expect(EmployeeModel.findById).toBeCalledWith(EmployeeId);
        });
        it("should return json body and response code 200", async() => {
            EmployeeModel.findById.mockReturnValue(newEmployee);
            await EmployeeController.getEmployeeById(req, res, next);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toStrictEqual(newEmployee);
            expect(res._isEndCalled()).toBeTruthy();
        });
        it("should do error handling", async() => {
            const errorMessage = { message: "error finding todoModel" };
            const rejectedPromise = Promise.reject(errorMessage);
            EmployeeModel.findById.mockReturnValue(rejectedPromise);
            await EmployeeController.getEmployeeById(req, res, next);
            expect(next).toHaveBeenCalledWith(errorMessage);
        });
        it("should handle 404", async() => {
            EmployeeModel.findById.mockReturnValue(null);
            await EmployeeController.getEmployeeById(req, res, next);
            expect(res.statusCode).toBe(404);
            expect(res._isEndCalled()).toBeTruthy();
        });
    });
    

});