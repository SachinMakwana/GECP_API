const Campus = require('../models/campus.model.js');
const fs = require('fs');

exports.create = (req, res) => {
    if (!(req.body.category || req.body.fileName || req.body.file || req.body.description)) {
        return res.status(400).send({
            message: "Please insert data"
        });
    }
    const campus = new Campus({
        category: req.body.category,
        fileName: req.body.fileName,
        filePath: "./Uploads/campus/" + req.body.fileName,
        description: req.body.description,
    });

    //save the attachments
    let buff = new Buffer.from(req.body.file, 'base64');
    fs.writeFileSync(campus.filePath, buff);

    campus.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating databse."
            });
        });
};


exports.findAllCampus = (req, res) => {
    Campus.find().then(campus => {
        res.send(campus);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findById = (req, res) => {
    Campus.findOne({ _id: req.params._id })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Campus not found with id" + req.params._id
                });
            }
            const contents = fs.readFileSync(data.filePath, { encoding: 'base64' });
            data.set('File', contents.toString(), { strict: false });
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Campus not found with id" + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Campus with id" + req.params._id
            });
        });
};

exports.findByCategory = (req, res) => {
    Campus.findOne({ category: req.params.category })
        .then(campus => {
            if (!campus) {
                return res.status(404).send({
                    message: "Campus not found with category" + req.params.category
                });
            }
            res.send(campus);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Campus not found with category" + req.params.category
                });
            }
            return res.status(500).send({
                message: "Error retrieving Campus with category" + req.params.category
            });
        });
};

exports.findByDescription = (req, res) => {
    Campus.findOne({ description: req.params.description })
        .then(campus => {
            if (!campus) {
                return res.status(404).send({
                    message: "Campus not found with Department Code " + req.params.description
                });
            }
            res.send(campus);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Campus not found with Department Code " + req.params.description
                });
            }
            return res.status(500).send({
                message: "Error retrieving Campus with Department Code " + req.params.deptCode
            });
        });
};

exports.updateById = (req, res) => {
    if (!(req.body.category || req.body.fileName || req.body.filePath || req.body.description)) {
        return res.status(400).send({
            message: "Campus details can not be empty"
        });
    }

    //save the attachments
    if (req.body.file != null) {
        let buff = new Buffer.from(req.body.file, 'base64');
        let filePath = "./Uploads/campus/" + req.body.fileName
        fs.writeFileSync(filePath, buff);
        console.log("file Updated");
    }

    //updating
    Campus.findOneAndUpdate({ _id: req.params._id }, {
        category: req.body.category,
        description: req.body.description,
        fileName: req.body.fileName,
        filePath: "./Uploads/campus/" + req.body.fileName,
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Campus not found with id " + req.params._id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Campus not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating Campus with id " + req.params._id
            });
        });
};

exports.deleteById = (req, res) => {
    Campus.findOneAndRemove(req.params._id)
        .then(data => {
            if (!data || data.length == 0) {
                return res.status(404).send({
                    message: " Campus not found with id " + req.params._id
                });
            }
            res.send({ message: "Campus deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err._id === 'NotFound') {
                return res.status(404).send({
                    message: "Campus not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete Campus with id " + req.params._id
            });
        });
};
