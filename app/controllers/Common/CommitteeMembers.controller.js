const CommitteeModel = require("../../models/Common/CommitteeMembers.model");

exports.create = (req, res) => {
  let { body } = req;

  const data = new CommitteeModel(body);

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

exports.findAll = (req, res) => {
  CommitteeModel
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

exports.findById = (req, res) => {
  const { PageId } = req.query;
  CommitteeModel.find({ PageId })
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

exports.updateById = (req, res) => {
  let { body } = req, { _id } = body;

  if (!_id) return res.status(400).send({ message: 'Please pass _id to update data.' });

  // Find college info and update it with the request body
  CommitteeModel
    .findOneAndUpdate(
      _id,
      body,
      { new: true }
    )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "info not found with id " + PageId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "info not found with id " + PageId,
        });
      }
      return res.status(500).send({
        message: "Error updating info with id " + PageId,
      });
    });
};

// // Delete a college info with the specified id in the request
exports.deleteById = (req, res) => {
  let { _id } = req.query;
  CommitteeModel
    .findOneAndRemove(_id)
    .then((colleges) => {
      if (!colleges) {
        return res.status(404).send({
          message: "info not found with id " + _id,
        });
      }
      res.send({ message: "info deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "info not found with id " + _id,
        });
      }
      return res.status(500).send({
        message: "Could not delete info with id " + _id,
      });
    });
};
