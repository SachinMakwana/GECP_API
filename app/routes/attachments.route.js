module.exports = (app) => {
    const attachments = require('../controllers/attachments.controller.js');

    app.post('/attachments', attachments.create);

    app.get('/attachments', attachments.findAllAttachments);

    app.get('/attachments/:_id', attachments.findById);

    app.put('/attachments/:_id', attachments.updateById);

    app.delete('/attachments/:_id', attachments.deleteById);    
    
    app.get('/attachments/createdBy/:createdBy', attachments.findByCreatedBy);
    
    app.get('/attachments/isDeleted/:isDeleted', attachments.findByIsDeleted);


}
