module.exports = (app) => {
    const users = require('../controllers/users.controller.js');

    app.post('/users', users.create);

    app.get('/users', users.findAllUsers);

    app.put('/users/:_id', users.updateById);

    app.delete('/users/:id', users.deleteById);

}