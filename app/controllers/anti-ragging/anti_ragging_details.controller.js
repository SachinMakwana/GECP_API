const Details = require('../../models/anti-ragging/anti-ragging_details.model');

exports.create = (req, res) => {
    if (!req.body.description) {
        return res.status(400).send({
            message: "Please add details"
        });
    }
    const member = new Details({
        description: req.body.description
    });

    member.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findDetails = (req, res) => {
    Details.findOne()
        .then(member => {
            res.send(member);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findById = (req, res) => {
    Details.findOne({ _id: req.params._id })
        .then(member => {
            if (!member) {
                return res.status(404).send({
                    message: "Anti Ragging Info not found with id " + req.params._id
                });
            }
            res.send(member);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Anti Ragging Info not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Anti Ragging Info with id " + req.params._id
            });
        });
};

exports.updateId = (req, res) => {
    let { body } = req;
    let { _id } = body;
    // Validate Request
    /* if(!req.body.women_description) {
        return res.status(400).send({
            message: "id not be empty"
        });
    } */

    // Find  info and update it with the request body
    Details.findByIdAndUpdate(_id, body, { new: true })
        .then(details => {
            if (!details) {
                return res.status(404).send({
                    message: "info not found with id " + _id
                });
            }
            res.send(details);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "info not found with id " + _id
                });
            }
            return res.status(500).send({
                message: "Error updating info with id " + _id
            });
        });
};

exports.deleteById = (req, res) => {
    Details.findOneAndRemove(req.params._id)
        .then(member => {
            if (!member) {
                return res.status(404).send({
                    message: " Anti Ragging Info not found with id " + req.params._id
                });
            }
            res.send({ message: "Anti Ragging Info deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Anti Ragging Info not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete Anti Ragging Info with id " + req.params._id
            });
        });
};
