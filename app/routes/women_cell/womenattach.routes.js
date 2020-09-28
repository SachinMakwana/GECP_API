module.exports = (app) => {
    const womenattach = require('../../controllers/women_cell/womenattach.controller');

    // Create
    app.post('/womenattach', womenattach.create);

    // // Retrieve 
     app.get('/womenattach', womenattach.findAll);

    // // Retrieve 
   app.get('/womenattach/:wcaId', womenattach.findwcaById);


   
//     // // Update 
  app.put('/womenattach/:wcaId', womenattach.updateId);


//     // // Delete a 
     app.delete('/womenattach/:wcaId', womenattach.deleteById);


}