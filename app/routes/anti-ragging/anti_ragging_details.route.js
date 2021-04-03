module.exports = (app) => {
    const Details = require('../../controllers/anti-ragging/anti_ragging_details.controller');

    app.post('/anti_ragging_details', Details.create);

    app.get('/anti_ragging_details', Details.findDetails);

    app.get('/anti_ragging_details/:_id', Details.findById);

    app.put('/anti_ragging_details', Details.updateId);

    app.delete('/anti_ragging_details/:_id', Details.deleteById);
}

