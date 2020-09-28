module.exports = (app) => {
    const ss = require('../controllers/ss.controller');

    // Create a new ss info
    app.post('/ss', ss.create);

    // // Retrieve all ss info
     app.get('/ss', ss.findAll);

    // // Retrieve a ss info with id
   app.get('/ss/:ssId', ss.findNssById);


   
//     // // Update a ss info with id
  app.put('/ss/:ssId', ss.updateId);


//     // // Delete a ss info with id
     app.delete('/ss/:ssId', ss.deleteById);


}