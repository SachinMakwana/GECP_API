module.exports = (app) => {
    const Faculty = require('../controllers/faculty.controller.js');

    app.post('/faculty', Faculty.createFaculty);

    app.get('/faculty', Faculty.findAllFaculty);

    app.get('/facultyById/:id', Faculty.findFacultyById);

    app.get('/faculty/name/:name', Faculty.findFacultyByName);

    app.get('/faculty/designation/:designation', Faculty.findFacultyByDesignation);

    app.get('/facultyByDept', Faculty.findFacultyByDeptCode);

    app.put('/faculty/:id', Faculty.updateFacultyById);

    app.delete('/faculty/:id', Faculty.deleteFacultyById);
};
