module.exports = (app) => {
    const placement = require('../../controllers/placement/placement.controller');

    app.post('/placement',placement.createPlacement);

    app.get('/placement',placement.findAllPlacement);

    app.get('/placement/:id',placement.findPlacementById);

    app.get('/placement/bydate/:dateOfCampus',placement.findPlacementByDateOfCampus);

    app.get('/placement/byCompany/:companyId',placement.findPlacementByCompanyId);

    app.get('/placement/bypkg/:lowestPkg/:highestPkg',placement.findPlacementByPackageRange);

    app.get('/placement/bystudent/:students',placement.findPlacementByStudentsTaken);

    app.put('/placement/:id',placement.updatePlacementById);

    app.delete('/placement/:id',placement.deletePlacementById);
};