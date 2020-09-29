module.exports = (app) => {
    const g_member = require('../../controllers/grievence/grievence_memberDetails.controller');

    app.post('/grievence_memberDetails', g_member.create);

    app.get('/grievence_memberDetails', g_member.findAll);

    app.get('/grievence_memberDetails/:_id', g_member.findById);

    app.put('/grievence_memberDetails/:_id', g_member.updateById);

    app.delete('/grievence_memberDetails/:_id', g_member.deleteById);

}

