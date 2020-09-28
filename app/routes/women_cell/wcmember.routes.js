module.exports = (app) => {
     const wc_member = require('../../controllers/women_cell/wcmember.controller');
 
     app.post('/wcmember', wc_member.create);
 
     app.get('/wcmember', wc_member.findAll);
 
 
     app.put('/wcmember/:wcId', wc_member.update);
 
     app.delete('/wcmember/:wcId', wc_member.delete);
    
 }
 
 