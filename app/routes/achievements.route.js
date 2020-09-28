module.exports = (app) => {
    const achieve = require('../controller/achievements.controller.js');

    app.post('/achieve', achieve.create);

    app.get('/achieve', achieve.findAllAchievements);

    //app.get('/achieve/:_id', achieve.findById);

    //app.get('/achieve/title/:title', achieve.findByTitle);

    //app.get('/achieve/category/:category', achieve.findByCategory);

    app.put('/achieve/:_id', achieve.updateById);

    //app.put('/achieve/:title', achieve.updateByTitle);

    //app.delete('/achieve/:title', achieve.deleteByTitle); 

    app.delete('/achieve/:id', achieve.deleteById); 

}