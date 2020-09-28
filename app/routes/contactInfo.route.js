module.exports = (app) => {

    const contactInfo = require('../controller/contactInfo.controller.js');

    app.post('/contactInfo', contactInfo.create);

    app.get('/contactInfo', contactInfo.findAll);

    app.get('/contactInfo/:_id', contactInfo.findById);

    app.put('/contactInfo/:_id', contactInfo.updateById);

    app.delete('/contactInfo/:_id', contactInfo.deleteById);

};
