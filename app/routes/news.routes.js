module.exports = (app) => {
    const news = require('../controllers/news.controllers');

    // Create a new news 
    app.post('/news', news.create);

    // // Retrieve all news
 app.get('/news', news.findAll);

// // // //     // // Retrieve a single news with id
  app.get('/news/byId/:newsId', news.findById);

// // // // // // Retrieve a single news with title
app.get('/news/bytitle/:title', news.findtitle);

// // // // // // Retrieve a single news with link
 app.get('/news/bylink/:linkPath', news.findlink);
   
// // // //     // // Update a news with id
  app.put('/news/:newsId', news.updateId);


// // // //     // // Delete a news info with id
   app.delete('/news/:newsId', news.deleteById);


}