const Attachments = require('../models/attachments.model.js');
const Common = require('../../common.js');
const fs = require('fs');

exports.create = (req, res) => {
    if (!(req.body.name || req.body.fileName || req.body.createdBy || req.body.file)) {
        return res.status(400).send({
            message: "Please insert data"
        });
    }
    const attachments = new Attachments({
        name: req.body.name,
        fileName: req.body.fileName,
        filePath: "./Uploads/attachments/" + req.body.fileName,
        createdBy: req.body.createdBy,
        isDeleted: false,
        createdAtInt: Common.getDateInt(),
    });

    //save the attachments
    let buff = new Buffer.from(req.body.file, 'base64');
    fs.writeFileSync(attachments.filePath, buff);

    attachments.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating databse."
            });
        });
};

//find all
exports.findAllAttachments = (req, res) => {
    Attachments.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findById = (req, res) => {
    Attachments.findOne({ _id: req.params._id })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Attachments not found with id" + req.params._id
                });
            }
            const contents = fs.readFileSync(data.filePath, { encoding: 'base64' });
            data.set('File', contents.toString(), { strict: false });
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Attachments not found with id" + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Attachments with id" + req.params._id
            });
        });
};

exports.findByCreatedBy = (req, res) => {
    Attachments.findOne({ createdBy: req.params.createdBy })
        .then(attachments => {
            if (!attachments) {
                return res.status(404).send({
                    message: "Attachments not found with created By" + req.params.createdBy
                });
            }
            res.send(attachments);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Attachments not found with created By" + req.params.createdBy
                });
            }
            return res.status(500).send({
                message: "Error retrieving Attachments with created By" + req.params.createdBy
            });
        });
};

//find by file is deleted or not
exports.findByIsDeleted = (req, res) => {
    Attachments.find({ isDeleted: req.params.isDeleted })
        .then(attachments => {
            if (!attachments) {
                return res.status(404).send({
                    message: "Attachments not found which are deleted"
                });
            }
            res.send(attachments);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Attachments not found which are deleted"
                });
            }
            return res.status(500).send({
                message: "Error retrieving Attachments which are deleted"
            });
        });
};

//update by id
exports.updateById = (req, res) => {
    if (!(req.body.name || req.body.fileName || req.body.filePath || req.body.createdBy)) {
        return res.status(400).send({
            message: "Attachments details can not be empty"
        });
    }

    //save the attachments
    if (req.body.file != null) {
        let buff = new Buffer.from(req.body.file, 'base64');
        let filePath = "./Uploads/attachments/" + req.body.fileName
        fs.writeFileSync(filePath, buff);
        console.log("file Updated");
    }

    //updating
    Attachments.findOneAndUpdate({ _id: req.params._id }, {
        name: req.body.name,
        fileName: req.body.fileName,
        filePath: "./Uploads/attachments/" + req.body.fileName,
        isDeleted: req.body.isDeleted,
        createdBy: req.body.createdBy,
        createdAtInt: Common.getDateInt()
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Attachments not found with id " + req.params._id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Attachments not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating Attachments with id " + req.params._id
            });
        });
};

exports.deleteById = (req, res) => {
    Attachments.findOneAndRemove(req.params._id)
        .then(data => {
            if (!data || data.length == 0) {
                return res.status(404).send({
                    message: " Attachments not found " + req.params._id
                });
            }
            res.send({ message: "Attachments deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Attachments not found  " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete Attachments with " + req.params._id
            });
        });
};

