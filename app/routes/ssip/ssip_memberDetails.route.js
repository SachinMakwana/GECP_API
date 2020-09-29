module.exports = (app) => {
    const s_member = require('../../controllers/ssip/ssip_memberDetails.controller');

    app.post('/ssip_memberDetails', s_member.create);

    app.get('/ssip_memberDetails', s_member.findAll);

    app.get('/ssip_memberDetails/:_id', s_member.findById);

    app.put('/ssip_memberDetails/:_id', s_member.updateById);

    app.delete('/ssip_memberDetails/:_id', s_member.deleteById);
   
}

