module.exports = (app) => {
  const womendetail = require('../../controllers/women_cell/women_detail.controller');

  // Create a new wd info
  app.post('/womendetail', womendetail.create);

  // Retrieve all wd info
  app.get('/womendetail', womendetail.findOne);

  // Update a wd info with id
  app.put('/womendetail', womendetail.updateId);
}