const Member = require('../../models/grievence/grievence_memberDetails.model');

exports.create = (req, res) => {
    if (!(req.body.name || req.body.role || req.body.designation || req.body.department)) {
        return res.status(400).send({
            message: "Please add Info "
        });
    }
    const g_member = new Member({
        name: req.body.name,
        role: req.body.role,
        designation: req.body.designation,
        department: req.body.department
    });

    g_member.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAll = (req, res) => {
    Member.find()
        .then(g_member => {
            res.send(g_member);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findById = (req, res) => {
    Member.findOne({ _id: req.params._id })
        .then(g_member => {
            if (!g_member) {
                return res.status(404).send({
                    message: "Grievence Cell Info not found with id " + req.params._id
                });
            }
            res.send(g_member);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Grievence Cell Info not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Grievence Cell Info with id " + req.params._id
            });
        });
};

exports.updateById = (req, res) => {
    if (!(req.body.name || req.body.role || req.body.designation || req.body.department)) {
        return res.status(400).send({
            message: "Grievence Cell Info details can not be empty"
        });
    }

    // Find code and update 
    Member.findOneAndUpdate({ _id: req.params._id }, {
        name: req.body.name,
        role: req.body.role,
        designation: req.body.designation,
        department: req.body.department
    }, { new: true })
        .then(g_member => {
            if (!g_member) {
                return res.status(404).send({
                    message: "Grievence Cell Info not found with id " + req.params._id
                });
            }
            res.send(g_member);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Grievence Cell Info not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating Grievence Cell Info with id " + req.params._id
            });
        });
};

exports.deleteById = (req, res) => {
    Member.findOneAndRemove(req.params._id)
        .then(g_member => {
            if (!g_member) {
                return res.status(404).send({
                    message: " Grievence Cell Info not found with id " + req.params._id
                });
            }
            res.send({ message: "Grievence Cell Info deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Grievence Cell Info not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete Grievence Cell Info with id " + req.params._id
            });
        });
}; 
