const Attachments = require('../../models/anti-ragging/anti-ragging_attachments.model');
const fs = require('fs');

exports.create = (req, res) => {
    if (!(req.body.name || req.body.fileName || req.body.file)) {
        return res.status(400).send({
            message: "Please insert data"
        });
    }
    const attachments = new Attachments({
        name: req.body.name,
        fileName: req.body.fileName,
        filePath: "./Uploads/anti_ragging/" + req.body.fileName,
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

exports.findAll = (req, res) => {
    Attachments.find().then(attachments => {
        res.send(attachments);
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

exports.updateById = (req, res) => {
    if (!(req.body.name || req.body.fileName || req.body.filePath)) {
        return res.status(400).send({
            message: "Attachments details can not be empty"
        });
    }

    //save the attachments
    if (req.body.file != null) {
        let buff = new Buffer.from(req.body.file, 'base64');
        let filePath = "../Uploads/anti_ragging/" + req.body.fileName
        fs.writeFileSync(filePath, buff);
        console.log("file Updated");
    }

    //updating
    Attachments.findOneAndUpdate({ _id: req.params._id }, {
        name: req.body.name,
        fileName: req.body.fileName,
        filePath: "../../../../Uploads/anti_ragging/" + req.body.fileName,
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "anti_ragging not found with id " + req.params._id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "anti_ragging not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating anti_ragging with id " + req.params._id
            });
        });
};

exports.deleteById = (req, res) => {
    Attachments.findOneAndRemove(req.params._id)
        .then(data => {
            if (!data || data.length == 0) {
                return res.status(404).send({
                    message: " anti_ragging not found with id " + req.params._id
                });
            }
            res.send({ message: "anti_ragging deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err._id === 'NotFound') {
                return res.status(404).send({
                    message: "anti_ragging not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete anti_ragging with id " + req.params._id
            });
        });
};

