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

exports.findDetails = (req, res) => {
    Details.findOne()
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
    let { body } = req, { _id } = body;
    /*  if (!req.body.description) {
         return res.status(400).send({
             message: "Grievence Cell details can not be empty"
         });
     }
  */
    // Find code and update 
    Details.findByIdAndUpdate(_id, body, { new: true })
        .then(details => {
            if (!details) {
                return res.status(404).send({
                    message: "SSIP Cell Info not found with id " + _id
                });
            }
            res.send(details);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "SSIP Cell Info not found with id " + _id
                });
            }
            return res.status(500).send({
                message: "Error updating SSIP Cell Info with id " + _id
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
