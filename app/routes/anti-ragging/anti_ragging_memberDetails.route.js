module.exports = (app) => {
    const Member = require('../../controllers/anti-ragging/anti_ragging_memberDetails.controller');

    app.post('/anti_ragging_memberDetails', Member.create);

    app.get('/anti_ragging_memberDetails', Member.findAll);

    app.get('/anti_ragging_memberDetails/:_id', Member.findById);

    app.put('/anti_ragging_memberDetails/:_id', Member.updateById);

    app.delete('/anti_ragging_memberDetails/:_id', Member.deleteById);
   
}

