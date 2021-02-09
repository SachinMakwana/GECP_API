module.exports = (app) => {
  const PeopleController = require('../../controllers/Common/People.controller');

  // Create a new college info
  app.post("/createAlumnis", PeopleController.create);

  // // Retrieve all college info
  app.get("/getAlumnis", PeopleController.findById);

  //     // // Retrieve a single college info with id
  /*app.get("/college/byId/:collegeId", college.findById);

  // Retrieve a single college with category
  app.get("/college/bycategory/:category", college.findCat);

  // // // Retrieve a single college with title
  app.get("/college/bytitle/:title", college.findtitle);

  //     // // Update a college info with id
  app.put("/college/:collegeId", college.updateId);

  //     // // Delete a college info with id
  app.delete("/college/:collegeId", college.deleteById);*/
};
