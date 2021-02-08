const MessageOfCommittee = require("../../models/Common/MessageOfCommittee.model");
//const common = require("../../common");
//create and save college info

exports.create = (req, res) => {
  const { PageId, Image, Title, Message } = req.body;

  //validate request
  /*if (!id) {
    return res.status(400).send({
      message: "id cannot be empty",
    });
  }*/

  //create college info
  const data = new MessageOfCommittee({
    Image:Image,
    Title:Title,
    Message:Message,
    PageId:PageId,
  });

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
  college
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
   MessageOfCommittee.findById(PageId)
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

//find college info with category
exports.findCat = (req, res) => {
  college
    .findOne({ category: req.params.category })
    .then((colleges) => {
      if (!colleges) {
        return res.status(404).send({
          message: "no info found with category " + req.params.category,
        });
      }
      res.send(colleges);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "no info found with category " + req.params.category,
        });
      }
      return res.status(500).send({
        message: "Error retrieving info with category " + req.params.category,
      });
    });
};

//find college info with title
exports.findtitle = (req, res) => {
  college
    .findOne({ title: req.params.title })
    .then((colleges) => {
      if (!colleges) {
        return res.status(404).send({
          message: "no info found with title " + req.params.title,
        });
      }
      res.send(colleges);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "no info found with title " + req.params.title,
        });
      }
      return res.status(500).send({
        message: "Error retrieving info with title " + req.params.title,
      });
    });
};

// // Update a college info with id
exports.updateId = (req, res) => {
    const { PageId, Image, Title, Message } = req.body;
  // Validate Request
  if (!PageId || !Image || !Title || !Message) {
    return res.status(400).send({
      message: "not be empty",
    });
  }

  // Find college info and update it with the request body
  MessageOfCommittee
    .findOneAndUpdate(
      PageId,
      {
        Image:Image,
        Title:Title,
        Message:Message,
      },
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
  college
    .findOneAndRemove(req.params.collegeId)
    .then((colleges) => {
      if (!colleges) {
        return res.status(404).send({
          message: "info not found with id " + req.params.collegeId,
        });
      }
      res.send({ message: "info deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "info not found with id " + req.params.collegeId,
        });
      }
      return res.status(500).send({
        message: "Could not delete info with id " + req.params.collegeId,
      });
    });
};
