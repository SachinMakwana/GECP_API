const VissionMission = require("../../models/Common/VisionMission.model");
const { ObjectID } = require('mongodb')
//const common = require("../../common");
//create and save college info

exports.create = (req, res) => {
  const { body } = req;

  //validate request
  /*if (!id) {
    return res.status(400).send({
      message: "id cannot be empty",
    });
  }*/

  //create college info
  const data = new VissionMission(body);

  //save college info in database

  data.save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the College info.",
      });
    });
};

//retrive and return all the college info from database

exports.findAll = (req, res) => {
  VissionMission
    .find()
    .then((colleges) => {
      res.send(colleges);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving college info.",
      });
    });
};

//find college info with id
exports.findById = (req, res) => {
  const { PageId } = req.query;

  VissionMission.findOne({ PageId: PageId })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "no info found with ID " + PageId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "no info found with ID " + PageId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving info with ID " + PageId,
      });
    });
};

// // Delete a college info with the specified id in the request
exports.deleteById = (req, res) => {
  let { PageId } = req.query;
  VissionMission
    .findOneAndRemove({ PageId })
    .then((colleges) => {
      if (!colleges) {
        return res.status(404).send({
          message: "info not found with id " + PageId,
        });
      }
      res.send({ message: "info deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "info not found with id " + PageId,
        });
      }
      return res.status(500).send({
        message: "Could not delete info with id " + PageId,
      });
    });
};
