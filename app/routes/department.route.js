module.exports = (app) => {
    const dept = require('../controllers/department.controller.js');

    // Create a new Note
    app.post('/dept', dept.create);

    // Retrieve all dept
    app.get('/dept', dept.findAll);

    // Retrieve a single Dept with code
    app.get('/dept/:code', dept.findOneByCode);
    
    // Retrieve a single Dept with name
    app.get('/dept/name/:name', dept.findOneByName);

    // Update a Department with code
    app.put('/dept/:code', dept.updateByCode);

    // Delete a Department with code
    app.delete('/dept/:code', dept.deleteByCode);
}