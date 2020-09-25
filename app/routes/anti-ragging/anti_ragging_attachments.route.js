module.exports = (app) => {
    const Attachments = require('../../controllers/anti-ragging/anti_ragging_attachments.controller');

    app.post('/anti_ragging_attachments', Attachments.create);

    app.get('/anti_ragging_attachments', Attachments.findAll);

    app.get('/anti_ragging_attachments/:_id', Attachments.findById);

    app.put('/anti_ragging_attachments/:_id', Attachments.updateById);

    app.delete('/anti_ragging_attachments/:_id', Attachments.deleteById);
  
}

