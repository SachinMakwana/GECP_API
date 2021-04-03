const Details = require('../../models/grievence/grievence_details.model');

exports.create = (req, res) => {
    let { body } = req;
    /* if (!req.body.description) {
        return res.status(400).send({
            message: "Please add Grievence Cell Info "
        });
    } */
    const g_details = new Details(body);

    g_details.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findDetails = (req, res) => {
    Details.findOne()
        .then(g_details => {
            res.send(g_details);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};
/*
exports.findById = (req, res) => {
    Details.findOne({ _id: req.params._id })
        .then(g_details => {
            if (!g_details) {
                return res.status(404).send({
                    message: "Grievence Cell Info not found with id " + req.params._id
                });
            }
            res.send(g_details);
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
*/
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
        .then(g_details => {
            if (!g_details) {
                return res.status(404).send({
                    message: "Grievence Cell Info not found with id " + _id
                });
            }
            res.send(g_details);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Contact Info not found with id " + _id
                });
            }
            return res.status(500).send({
                message: "Error updating Grievence Cell Info with id " + _id
            });
        });
};
/*
exports.deleteById = (req, res) => {
    Details.findOneAndRemove(req.params._id)
        .then(g_details => {
            if (!g_details) {
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
}; */
