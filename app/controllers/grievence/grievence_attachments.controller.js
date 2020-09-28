const G_Attachments = require('../../models/grievence/grievence_attachments.model');
const fs = require('fs');

exports.create = (req, res) => {
    if (!(req.body.name || req.body.fileName)) {
        return res.status(400).send({
            message: "Please insert data"
        });
    }
    const g_attachments = new G_Attachments({
        name: req.body.name,
        fileName: req.body.fileName,
        filePath: "./Uploads/grievence/" + req.body.filePath,
    });

    //save the attachments
    let buff = new Buffer.from(req.body.file, 'base64');
    fs.writeFileSync(g_attachments.filePath, buff);

    g_attachments.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating databse."
            });
        });
};

exports.findAll = (req, res) => {
    G_Attachments.find().then(g_attachments => {
        res.send(g_attachments);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findById = (req, res) => {
    G_Attachments.findOne({ _id: req.params._id })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Grievence Cell not found with id" + req.params._id
                });
            }
            const contents = fs.readFileSync(data.filePath, { encoding: 'base64' });
            data.set('File', contents.toString(), { strict: false });
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Grievence Cell not found with id" + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Grievence Cell with id" + req.params._id
            });
        });
};

exports.updateById = (req, res) => {
    if (!(req.body.name || req.body.fileName || req.body.filePath)) {
        return res.status(400).send({
            message: "Grievence Cell details can not be empty"
        });
    }

    //save the attachments
    if (req.body.file != null) {
        let buff = new Buffer.from(req.body.file, 'base64');
        let filePath = "../../../../Uploads/grievence/" + req.body.fileName
        fs.writeFileSync(filePath, buff);
        console.log("file Updated");
    }

    //updating
    G_Attachments.findOneAndUpdate({ _id: req.params._id }, {
        name: req.body.name,
        fileName: req.body.fileName,
        filePath: "../../../../Uploads/grievence/" + req.body.fileName,
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Grievence Cell not found with id " + req.params._id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Grievence Cell not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error updating Grievence Cell with id " + req.params._id
            });
        });
};

exports.deleteById = (req, res) => {
    G_Attachments.findOneAndRemove(req.params._id)
        .then(data => {
            if (!data || data.length == 0) {
                return res.status(404).send({
                    message: " Grievence Cell not found with id " + req.params._id
                });
            }
            res.send({ message: "Grievence Cell deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err._id === 'NotFound') {
                return res.status(404).send({
                    message: "Grievence Cell not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete Grievence Cell with id " + req.params._id
            });
        });
};

