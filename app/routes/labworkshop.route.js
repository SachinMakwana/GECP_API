module.exports = (app) => {
    const labworkshop = require('../controllers/labWorkshop.controller.js');

    app.post('/labworkshop',labworkshop.createLabWorkshop);

    app.get('/labworkshop',labworkshop.findAllLabWorkshop);

    app.get('/labworkshop/:id',labworkshop.findLabWorkshopById);

    app.get('/labworkshop/name/:name',labworkshop.findLabWorkshopByName);

    app.get('/labworkshop/category/:category',labworkshop.findLabWorkshopByCategory);

    app.get('/labworkshop/dept/:deptCode',labworkshop.findLabWorkshopByDeptCode);

    app.put('/labworkshop/:id',labworkshop.updateLabWorkshopById);

    app.put('/labworkshop/name/:name',labworkshop.updateLabWorkshopByName);

    app.delete('/labworkshop/:id',labworkshop.deleteLabWorkshopById);

    app.delete('/labworkshop/name/:name',labworkshop.deleteLabWorkshopByName);
};