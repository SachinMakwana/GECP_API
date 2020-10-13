module.exports = (app) => {
    const users = require('../controllers/user.controller');

    app.post('/users', users.create);

    app.post('/login', users.find);

    app.post('/login/user', users.findByUserName);

    app.post('/logout', users.logout);

    app.post('/refresh', users.refreshToken);

    app.get('/random', users.random);
}