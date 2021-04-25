const gallery = require("../models/gallery.models");
const common = require("../../common");
//create and save gallery info

exports.create = (req, res) => {
  let { body } = req;
  //validate request
  // if(!req.body.title){
  // 	return res.status(400).send({
  // 		message : "title cannot be empty"
  // 	});
  // }

  //create gallery info

  let saveBody = {
    ...body,
    categoryClass: body.category
      ? body.category.replace(/[^A-Z0-9]+/gi, "")
      : "",
  };

  const Gallery = new gallery(saveBody);

  //save gallery info in database

  Gallery.save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the gallery info.",
      });
    });
};

//retrive and return all the gallery from database

exports.findAll = async (req, res) => {
  try {
    let filteredArr = [];
    const galleryData = await gallery.find();

    const categoryClassData = await gallery.find(
      {},
      { _id: 0, category: 1, categoryClass: 1 }
    );

    const key = "categoryClass";
    if (categoryClassData && categoryClassData.length) {
      filteredArr = [
        ...new Map(categoryClassData.map((item) => [item[key], item])).values(),
      ];
    }

    res.send({
      categoryClass: filteredArr.length ? filteredArr : [],
      data: galleryData,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message || err,
    });
  }
};

//find gallery info with id
exports.findById = (req, res) => {
  gallery
    .findById(req.params.galleryId)
    .then((gallerys) => {
      if (!gallerys) {
        return res.status(404).send({
          message: "no gallerys found with ID " + req.params.galleryId,
        });
      }
      res.send(gallerys);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "no gallerys found with ID " + req.params.galleryId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving gallery with ID " + req.params.galleryId,
      });
    });
};

//find gallery info with title
exports.findtitle = (req, res) => {
  gallery
    .findOne({ title: req.params.title })
    .then((gallerys) => {
      if (!gallerys) {
        return res.status(404).send({
          message: "no gallerys found with title " + req.params.title,
        });
      }
      res.send(gallerys);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "no gallerys found with title " + req.params.title,
        });
      }
      return res.status(500).send({
        message: "Error retrieving gallery with title " + req.params.title,
      });
    });
};

// // Update a gallery info with id
exports.updateId = (req, res) => {
  // Validate Request
  /* if (!req.body.title) {
        return res.status(400).send({
            message: "title not be empty"
        });
    } */

  let { body } = req,
    { _id } = body;
  let updateBody = {
    ...body,
    categoryClass: body.category
      ? body.category.replace(/[^A-Z0-9]+/gi, "")
      : "",
  };

  // Find gallery info and update it with the request body
  gallery
    .findByIdAndUpdate(_id, updateBody, { new: true })
    .then((gallerys) => {
      if (!gallerys) {
        return res.status(404).send({
          message: " gallery info not found with id " + _id,
        });
      }
      res.send(gallerys);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "gallery info not found with id " + _id,
        });
      }
      return res.status(500).send({
        message: "Error updating gallery info with id " + _id,
      });
    });
};

// // Delete a gallery info with the specified id in the request
exports.deleteById = (req, res) => {
  gallery
    .findByIdAndRemove(req.params.galleryId)
    .then((gallerys) => {
      if (!gallerys) {
        return res.status(404).send({
          message: "gallerys not found with id " + req.params.galleryId,
        });
      }
      res.send({ message: "gallery deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "gallerys not found with id " + req.params.galleryId,
        });
      }
      return res.status(500).send({
        message: "Could not delete gallerys with id " + req.params.galleryId,
      });
    });
};
