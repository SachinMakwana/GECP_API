module.exports = (app) => {
    const Attachments = require('../../controllers/placement/placement_attachments.controller');

    app.post('/placement_attachments', Attachments.create);

    app.get('/placement_attachments', Attachments.findAll);

    app.get('/placement_attachments/:_id', Attachments.findById);

    app.put('/placement_attachments/:_id', Attachments.updateById);

    app.delete('/placement_attachments/:_id', Attachments.deleteById);
  
}

