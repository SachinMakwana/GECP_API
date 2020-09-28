const Details = require('../../models/ssip/ssip_details.model');

exports.create = (req, res) => {
    if (!req.body.description) {
        return res.status(400).send({
            message: "Please add SSIP Info "
        });
    }
    const s_details = new Details({
        description: req.body.description
    });

    s_details.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAll = (req, res) => {
    Details.find()
        .then(s_details => {
            res.send(s_details);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findById = (req, res) => {
    Details.findOne({ _id: req.params._id })
        .then(s_details => {
            if (!s_details) {
                return res.status(404).send({
                    message: "ssip Info not found with id " + req.params._id
                });
            }
            res.send(s_details);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "ssip Info not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving ssip Info with id " + req.params._id
            });
        });
};

exports.updateById = (req, res) => {
    if (!req.body.description) {
        return res.status(400).send({
            message: "SSIP  details can not be empty"
        });
    }

    // Find code and update 
    Details.findOneAndUpdate({ _id: req.params._id }, {
        description: req.body.description
    }, { new: true })
        .then(s_details => {
            if (!s_details) {
                return res.status(404).send({
                    message: " Info not found with id " + req.params._id
                });
            }
            res.send(s_details);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Contact Info not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating Contact Info with id " + req.params._id
            });
        });
};

exports.deleteById = (req, res) => {
    Details.findOneAndRemove(req.params._id)
        .then(s_details => {
            if (!s_details) {
                return res.status(404).send({
                    message: " ssip Info not found with id " + req.params._id
                });
            }
            res.send({ message: "ssip Info deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "ssip Info not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete ssip Info with id " + req.params._id
            });
        });
}; 
