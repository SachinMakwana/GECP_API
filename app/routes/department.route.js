module.exports = (app) => {
    const gecp = require('../controllers/department.controller');

    // Create a department
    app.post('/department', gecp.create);

    //Retrieve all department
    app.get('/department', gecp.findAll);

    // // Retrieve a department with code
    app.get('/departmentByCode', gecp.findDept);

    // // Retrieve a department with name
    app.get('/department/byname/:name', gecp.findName);

    // // Update departmentwith id
    app.put('/department/:deptId', gecp.update);

    // // Delete a department with id
    app.delete('/department/:deptId', gecp.delete);
}