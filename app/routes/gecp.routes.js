module.exports = (app) => {
    const gecp = require('../controllers/gecp.controller');

    // Create a department
    app.post('/department', gecp.create);

    //Retrieve all department
     app.get('/department', gecp.findAll);

    // // Retrieve a department with code
     app.get('/department/:code', gecp.findDept);

       // // Retrieve a department with name
     app.get('/department/byname/:name', gecp.findName);


    // // Update departmentwith id
    app.put('/department/:deptId', gecp.update);

    // // Delete a department with id
     app.delete('/department/:deptId', gecp.delete);
}
