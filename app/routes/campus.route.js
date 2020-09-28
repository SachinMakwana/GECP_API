module.exports = (app) => {
     const campus = require('../controller/campus.controller.js');

     app.post('/campus', campus.create);

     app.get('/campus', campus.findAllCampus);

     app.get('/campus/:_id', campus.findById);

     app.get('/campus/category/:category', campus.findByCategory);

     app.get('/campus/description/:description', campus.findByDescription);

     app.put('/campus/:_id', campus.updateById);

     app.delete('/campus/:_id', campus.deleteById);

     
}

