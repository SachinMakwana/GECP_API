module.exports = (app) => {
    const s_attachments = require('../../controllers/ssip/ssip_attachments.controller');

    app.post('/ssip_attachments', s_attachments.create);

    app.get('/ssip_attachments', s_attachments.findAll);

    app.get('/ssip_attachments/:_id', s_attachments.findById);

    app.put('/ssip_attachments/:_id', s_attachments.updateById);

    app.delete('/ssip_attachments/:_id', s_attachments.deleteById);
   
}

