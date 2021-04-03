module.exports = (app) => {
  const nss = require('../controllers/nss.controller');

  // Create a new nss info
  app.post('/nss', nss.create);

  app.post('/nssDetails', nss.createBasicDetails);

  app.get('/nssDetails', nss.findDetails);

  // Retrieve all nss info
  app.get('/nss', nss.findAll);

  // Retrieve a single nss info with id
  app.get('/nss/:nssId', nss.findNssById);

  // Update a nss info with id
  app.put('/nss/:nssId', nss.updateId);

  app.put('/nssDetails', nss.updateById);

  // Delete a nss info with id
  app.delete('/nss/:nssId', nss.deleteById);


}