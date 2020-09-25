const Affiliation = require('../models/affiliation.model');
const fs = require('fs');
const affiliationModel = require('../models/affiliation.model');

//create and save a new affiliation details
exports.create = (req, res) => {
    //validate request
    if (!req.body.name || !req.body.fileName || !req.body.file) {
        return res.status(400).send({
            message: "Please insert data"
        });
    }

    //Create a affiliation
    const affil = new Affiliation({
        name: req.body.name,
        fileName: req.body.fileName,
        filePath: "./Uploads/affiiation/" +req.body.fileName
    });

    //save the affiliation
    let buff = new Buffer.from(req.body.file, 'base64');
    fs.writeFileSync(affil.filePath, buff);

    affil.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating databse."
            });
        });
};

//find affiliation by id
exports.findAffiliationById = (req, res) => {
    //finding by id
    Affiliation.findById(req.params._id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Affiliation not found with id " + req.params.id
                });
            }
            const contents = fs.readFileSync(data.filePath, {encoding: 'base64'});
            data.set('file',contents.toString(),{strict:false});
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Affiliation not found with id " + req.params.id
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//find all affiliations
exports.findAll = (req, res) => {
    Affiliation.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving affiliations."
            });
        });
};

exports.updateById = (req, res) => {
    //validate request
    if (!req.body.name || !req.body.fileName || !req.body.filePath) {
        return res.status(400).send({
            message: "Please insert data of affiliation in body"
        });
    }

    //save the affiliation
    if(req.body.file != null) {
        let buff = new Buffer.from(req.body.file, 'base64');
        let filePath =  "./Uploads/affiiation/" +req.body.fileName
        fs.writeFileSync(filePath, buff);
        console.log("file Updated");
    }

    //updating
    Affiliation.findByIdAndUpdate(req.params._id, {
        name: req.body.name,
        fileName: req.body.fileName,
        filePath: "./Uploads/affiiation/" +req.body.fileName
    }, {
        new: true
    }).then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Affiliation not found with id " + req.params._id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Affiliation not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving affiliation with id " + req.params._id
            });
        });
};

//delete by affiliation code
exports.deleteById = (req, res) => {
    Affiliation.findByIdAndDelete(req.params._id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Affiliation not found with id " + req.params._id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Affiliation not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving affiliation with id " + req.params._id
            });
        });
};