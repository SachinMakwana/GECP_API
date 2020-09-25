const Member = require('../../models/anti-ragging/anti-ragging_memberDetails.model');

exports.create = (req, res) => {
    if (!(req.body.name || req.body.role || req.body.designation || req.body.department)) {
        return res.status(400).send({
            message: "Please add Info "
        });
    }
    const member = new Member({
        name: req.body.name,
        role: req.body.role,
        designation: req.body.designation,
        department: req.body.department
    });

    member.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAll = (req, res) => {
    Member.find()
        .then(member => {
            res.send(member);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findById = (req, res) => {
    Member.findOne({ _id: req.params._id })
        .then(member => {
            if (!member) {
                return res.status(404).send({
                    message: "Member not found with id " + req.params._id
                });
            }
            res.send(member);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Member not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Member with id " + req.params._id
            });
        });
};

exports.updateById = (req, res) => {
    if (!(req.body.name || req.body.role || req.body.designation || req.body.department)) {
        return res.status(400).send({
            message: "Member's details can not be empty"
        });
    }

    // Find code and update 
    Member.findOneAndUpdate({ _id: req.params._id }, {
        name: req.body.name,
        role: req.body.role,
        designation: req.body.designation,
        department: req.body.department
    }, { new: true })
        .then(member => {
            if (!member) {
                return res.status(404).send({
                    message: "Member not found with id " + req.params._id
                });
            }
            res.send(member);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Member not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating Member with id " + req.params._id
            });
        });
};

exports.deleteById = (req, res) => {
    Member.findOneAndRemove(req.params._id)
        .then(member => {
            if (!member) {
                return res.status(404).send({
                    message: " Member not found with id " + req.params._id
                });
            }
            res.send({ message: "Member deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Member not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete Member with id " + req.params._id
            });
        });
}; 
