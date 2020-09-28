module.exports = (app) => {
    const g_attachments = require('../../controller/grievence/grievence_attachments.controller');

    app.post('/grievence_attachments', g_attachments.create);

    app.get('/grievence_attachments', g_attachments.findAll);

    app.get('/grievence_attachments/:_id', g_attachments.findById);

    app.put('/grievence_attachments/:_id', g_attachments.updateById);

    app.delete('/grievence_attachments/:_id', g_attachments.deleteById);

}

