module.exports = (app) => {
    const Member = require('../../controllers/placement/placement_memberDetails.controller');

    app.post('/placement_memberDetails', Member.create);

    app.get('/placement_memberDetails', Member.findAll);

    app.get('/placement_memberDetails/:_id', Member.findById);

    app.put('/placement_memberDetails/:_id', Member.updateById);

    app.delete('/placement_memberDetails/:_id', Member.deleteById);
   
}

