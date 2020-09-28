const S_Attachments = require('../../models/ssip/ssip_attachments.model');
const fs = require('fs');

exports.create = (req, res) => {
    if (!(req.body.name || req.body.fileName || req.body.file)) {
        return res.status(400).send({
            message: "Please insert data"
        });
    }
    const s_attachments = new S_Attachments({
        name: req.body.name,
        fileName: req.body.fileName,
        filePath: "./Uploads/ssip/" + req.body.filePath,
    });

    //save the attachments
    let buff = new Buffer.from(req.body.file, 'base64');
    fs.writeFileSync(s_attachments.filePath, buff);

    s_attachments.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating databse."
            });
        });
};

exports.findAll = (req, res) => {
    S_Attachments.find().then(s_attachments => {
        res.send(s_attachments);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findById = (req, res) => {
    S_Attachments.findOne({ _id: req.params._id })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "SSIP not found with id" + req.params._id
                });
            }
            const contents = fs.readFileSync(data.filePath, { encoding: 'base64' });
            data.set('File', contents.toString(), { strict: false });
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "SSIP not found with id" + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving SSIP with id" + req.params._id
            });
        });
};

exports.updateById = (req, res) => {
    if (!(req.body.name || req.body.fileName || req.body.filePath)) {
        return res.status(400).send({
            message: "SSIP details can not be empty"
        });
    }

    //save the attachments
    if (req.body.file != null) {
        let buff = new Buffer.from(req.body.file, 'base64');
        let filePath = "../Uploads/ssip/" + req.body.fileName
        fs.writeFileSync(filePath, buff);
        console.log("file Updated");
    }

    //updating
    S_Attachments.findOneAndUpdate({ _id: req.params._id }, {
        name: req.body.name,
        fileName: req.body.fileName,
        filePath: "../../../../Uploads/ssip/" + req.body.fileName,
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "ssip not found with id " + req.params._id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "ssip not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating ssip with id " + req.params._id
            });
        });
};

exports.deleteById = (req, res) => {
    S_Attachments.findOneAndRemove(req.params._id)
        .then(data => {
            if (!data || data.length == 0) {
                return res.status(404).send({
                    message: " ssip not found with id " + req.params._id
                });
            }
            res.send({ message: "ssip deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err._id === 'NotFound') {
                return res.status(404).send({
                    message: "ssip not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete ssip with id " + req.params._id
            });
        });
};

