const Member = require('../../models/ssip/ssip_memberDetails.model');

exports.create = (req, res) => {
    if (!(req.body.name || req.body.role || req.body.designation || req.body.department)) {
        return res.status(400).send({
            message: "Please add Info "
        });
    }
    const s_member = new Member({
        name: req.body.name,
        role: req.body.role,
        designation: req.body.designation,
        department: req.body.department
    });

    s_member.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAll = (req, res) => {
    Member.find()
        .then(s_member => {
            res.send(s_member);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findById = (req, res) => {
    Member.findOne({ _id: req.params._id })
        .then(s_member => {
            if (!s_member) {
                return res.status(404).send({
                    message: "SSIP Info not found with id " + req.params._id
                });
            }
            res.send(s_member);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "SSIP Info not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving SSIP Info with id " + req.params._id
            });
        });
};

exports.updateById = (req, res) => {
    if (!(req.body.name || req.body.role || req.body.designation || req.body.department)) {
        return res.status(400).send({
            message: "ssip Info details can not be empty"
        });
    }

    // Find code and update 
    Member.findOneAndUpdate({ _id: req.params._id }, {
        name: req.body.name,
        role: req.body.role,
        designation: req.body.designation,
        department: req.body.department
    }, { new: true })
        .then(s_member => {
            if (!s_member) {
                return res.status(404).send({
                    message: "ssip Info not found with id " + req.params._id
                });
            }
            res.send(s_member);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "ssip Info not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating ssip Info with id " + req.params._id
            });
        });
};

exports.deleteById = (req, res) => {
    Member.findOneAndRemove(req.params._id)
        .then(s_member => {
            if (!s_member) {
                return res.status(404).send({
                    message: " SSIP Info not found with id " + req.params._id
                });
            }
            res.send({ message: "SSIP Info deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "SSIP Info not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete SSIP Info with id " + req.params._id
            });
        });
}; 
