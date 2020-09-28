const Users = require('../models/users.model.js');

exports.create = (req, res) => {
    if (!(req.body.username || req.body.password)) {
        return res.status(400).send({
            message: "Please Fill up Users Details"
        });
    }
    const users = new Users({
        username: req.body.username,
        password: req.body.password,
    });

    users.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAllUsers = (req, res) => {
    Users.find().then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.updateById = (req, res) => {
    if (!(req.body.username || req.body.password)) {
        return res.status(400).send({
            message: "Please Fill up Users Details"
        });
    }

    Users.findOneAndUpdate({ _id: req.params._id }, {
        username: req.body.username,
        password: req.body.password,
    }, { new: true })
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "Users not found with id " + req.params._id
                });
            }
            res.send(users);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Users not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating Users with id " + req.params._id
            });
        });
};


exports.deleteById = (req, res) => {
    Users.findOneAndRemove(req.params._id)
        .then(users => {
            if (!users || users.length == 0) {
                return res.status(404).send({
                    message: " Users not found with id " + req.params._id
                });
            }
            res.send({ message: "Users deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err._id === 'NotFound') {
                return res.status(404).send({
                    message: "Users not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete Users with id " + req.params._id
            });
        });
};

