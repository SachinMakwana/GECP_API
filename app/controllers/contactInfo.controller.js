const ContactInfo = require('../models/contactInfo.model.js');

exports.create = (req, res) => {
    if(!((req.body.address) || (req.body.phoneNo) || (req.body.email))){
        return res.status(400).send({
            message: "Please add Contact Info "
        });
    }
    const contactInfo = new ContactInfo({
    address : req.body.address,
    phoneNo : req.body.phoneNo,
    email : req.body.email
    });

    contactInfo.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

 exports.findAll = (req, res) => {
    ContactInfo.find()
        .then(contactInfo => {
            res.send(contactInfo);
        }).catch(err => {
            res.status(500).send({
                message: err.message 
            });
        });
};

exports.findById = (req, res) => {
    ContactInfo.findOne({ _id: req.params._id })
    .then(contactInfo => {
        if(!contactInfo){
            return res.status(404).send({
                message: "Contact Info not found with id "  + req.params._id
            });
        }
        res.send(contactInfo);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Contact Info not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving Contact Info with id " + req.params._id
        });
    });
};

exports.updateById = (req, res) => {
    if (!req.body.address || !req.body.phoneNo || !req.body.email) {
        return res.status(400).send({
            message: "Contact Info details can not be empty"
        });
    }

    // Find code and update 
    ContactInfo.findOneAndUpdate( { _id: req.params._id}, {
        address : req.body.address,
        phoneNo : req.body.phoneNo,
        email : req.body.email
 
    }, { new: true })
        .then(contactInfo => {
            if (!contactInfo) {
                return res.status(404).send({
                    message: "Contact Info not found with id " + req.params._id
                });
            }
            res.send(contactInfo);
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
    ContactInfo.findOneAndRemove(req.params._id)
        .then(contactInfo => {
            if (!contactInfo) {
                return res.status(404).send({
                    message: " Contact Info not found with id " + req.params._id
                });
            }
            res.send({ message: "Contact Info deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Contact Info not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete Contact Info with id " + req.params._id
            });
        });
}; 
