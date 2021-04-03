module.exports = (app) => {
    const s_details = require('../../controllers/ssip/ssip_details.controller');

    app.post('/ssip_details', s_details.create);

    app.get('/ssip_details', s_details.findDetails);

    app.get('/ssip_details/:_id', s_details.findById);

    app.put('/ssip_details', s_details.updateById);

    app.delete('/ssip_details/:_id', s_details.deleteById);

}

