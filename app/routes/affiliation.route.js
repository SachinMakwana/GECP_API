module.exports = (app) => {
    const affiliation = require('../controllers/affiliation.controller');

    // Create a new affiliation
    app.post('/affiliation', affiliation.create);

    // Retrieve all affiliation
    app.get('/affiliation', affiliation.findAll);

    // Retrieve with id
    app.get('/affiliation/:_id', affiliation.findAffiliationById);

    // Update a affiliation with code
    app.put('/affiliation/:_id', affiliation.updateById);

    // Delete a affiliation with code
    app.delete('/affiliation/:_id', affiliation.deleteById);
}