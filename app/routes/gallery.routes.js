module.exports = (app) => {
   const gallery = require('../controllers/gallery.controllers');

   // Create a new image in gallery
   app.post('/gallery', gallery.create);

   // Retrieve all images
   app.get('/gallery', gallery.findAll);

   // Retrieve a single image  with id
   app.get('/gallery/byId/:galleryId', gallery.findById);

   // Retrieve a single image with title
   app.get('/gallery/bytitle/:title', gallery.findtitle);

   // Update a gallery info with id
   app.put('/gallery/:galleryId', gallery.updateId);

   // Delete a gallery info with id
   app.delete('/gallery/:galleryId', gallery.deleteById);


}