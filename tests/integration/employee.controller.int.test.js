const request = require("supertest");
const app = require("../../app");
const newEmployee = require("../mock-data/new-employee.json");

const endpointUrl = "/employee/";

let firstEmployee, EmployeeId;
const nonExistingEmployeeId = "61c2d40c645c34879dc08a68";
const testData = { empId: "2", name: "Rahul", designation: "Trainee", department: "IT" };

describe(endpointUrl, () => {
    test("get", () => {
        expect();
    })
    test("GET " + endpointUrl, async() => {
        const response = await request(app).get(endpointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();

        expect(response.body[0].empId).toBeDefined();
        expect(response.body[0].name).toBeDefined();
        expect(response.body[0].designation).toBeDefined();
        expect(response.body[0].department).toBeDefined();
        firstEmployee = response.body[0];
    });

    test("GET by Id " + endpointUrl + ":Id", async() => {
        const response = await request(app).get(endpointUrl + firstEmployee._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.empId).toBe(firstEmployee.empId);
        expect(response.body.name).toBe(firstEmployee.name);
        expect(response.body.designation).toBe(firstEmployee.designation);
        expect(response.body.department).toBe(firstEmployee.department);

    });
    test("GET Employee id doesn't exist" + endpointUrl + ":Id", async() => {
        const response = await request(app).get(endpointUrl + nonExistingEmployeeId);
        expect(response.statusCode).toBe(404);
    });

    /*   it("POST " + endpointUrl, async() => {
           const response = await request(app)
               .post(endpointUrl)
               .send(newEmployee);
           expect(response.statusCode).toBe(201);
           expect(response.body.empId).toBe(newEmployee.empId);
           expect(response.body.name).toBe(newEmployee.name);
           EmployeeId = response.body._id;
       });
    */
    it(
        "should return error 500" + endpointUrl,
        async() => {
            const response = await request(app)
                .post(endpointUrl)
                .send({ empId: "1", name: "Ram" });
            expect(response.statusCode).toBe(500);
            expect(response.body).toStrictEqual({
                message: "Employee validation failed: department: Path `department` is required., designation: Path `designation` is required."
            });
        }
    );



    it("should return 404 on PUT " + endpointUrl, async() => {
        const res = await request(app)
            .put(endpointUrl + nonExistingEmployeeId)
            .send(testData);
        expect(res.statusCode).toBe(404);
    });

    test("HTTP DELETE 404", async() => {
        const res = await request(app)
            .delete(endpointUrl + nonExistingEmployeeId)
            .send();
        expect(res.statusCode).toBe(404);
    });



});