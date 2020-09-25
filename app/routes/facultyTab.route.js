module.exports = (app) => {
    const FacultyTab = require('../controllers/facultyTab.controller.js');

    app.post('/facultyTab',FacultyTab.createFacultyTab);

    app.get('/facultyTab',FacultyTab.findAllFacultyTab);

    app.get('/facultyTab/:id',FacultyTab.findFacultyTabById);

    app.get('/facultyTab/facultyId/:facultyId',FacultyTab.findFacultyTabByFacultyId);

    app.put('/facultyTab/:id',FacultyTab.updateFacultyTabById);

    app.delete('/facultyTab/:id',FacultyTab.deleteFacultyTabById);
};
