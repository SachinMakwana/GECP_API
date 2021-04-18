module.exports = (app) => {
  const Image = require("../controllers/image.controllers");

  // Create a new image in gallery
  app.post("/image", Image.create);

  // Retrieve all images
  app.get("/image", Image.findAll);

  // // Retrieve a single image  with id
  // app.get('/image/byId/:galleryId', Image.findById);

  // // Retrieve a single image with title
  // app.get('/image/bytitle/:title', Image.findtitle);

  // Update a image info with id
  app.put("/image", Image.updateId);

  // Delete a gallery info with id
  // app.delete('/image/:galleryId', Image.deleteById);
};
