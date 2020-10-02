const Subject = require('../models/subject.model.js');
const common = require('../../common');

exports.create = (req, res) => {

    //validate request
    if (!(req.body.code || req.body.name || req.body.knownAs || req.body.sem || req.body.deptCode)) {
        return res.status(400).send({
            message: "Please insert data"
        });
    }

    //create a subject
    const sub = new Subject({
        code: req.body.code,
        name: req.body.name,
        knownAs: req.body.knownAs,
        sem: req.body.sem,
        deptCode: req.body.deptCode,
        createdAtInt: common.getDateInt(),
        updatedAtInt: common.getDateInt()
    });

    //save the subject
    sub.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating databse."
            });
        });
};

//find all subjects
exports.findAll = (req, res) => {
    Subject.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving subjects."
            });
        });
};

//find by subject code
exports.findBySubCode = (req, res) => {
    Subject.findOne({ code: req.params.code })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Subject not found with code " + req.params.code
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Subject not found with code " + req.params.code
                });
            }
            return res.status(500).send({
                message: "Error retrieving subject with code " + req.params.code
            });
        });
};

//find subject by name (known as)
exports.findBySubName = (req, res) => {
    Subject.findOne({ knownAs: { $regex: req.params.knownAs, $options: "i" } })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Subject not found with code " + req.params.knownAs
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Subject not found with name " + req.params.knownAs
                });
            }
            return res.status(500).send({
                message: "Error retrieving subject with name " + req.params.knownAs
            });
        });
};

//find Subject By Dept And Sem
exports.findByDeptAndSem = (req, res) => {
    Subject.find({ sem: req.params.sem, deptCode: req.params.deptCode })
        .then(data => {
            if (data.length == 0) {
                return res.status(404).send({
                    message: "Subjects Not Found With Entered Dept " + req.params.deptCode + " And Sem " + req.params.sem + ".!"
                });
            }
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving subjects."
            });
        });
};


//update subject by code
exports.updateByCode = (req, res) => {
    //validate request
    if (!(req.body.name || req.body.knownAs || req.body.sem || req.body.deptCode)) {
        return res.status(400).send({
            message: "Please insert data, Subject data can't be empty in body."
        });
    }

    Subject.findOneAndUpdate({ code: req.params.code }, {
            code: req.body.code,
            name: req.body.name || name,
            knownAs: req.body.knownAs || knownAs,
            sem: req.body.sem || sem,
            deptCode: req.body.deptCode || deptCode
        }, {
            new: true
        })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Subject not found with code " + req.params.code
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Subject not found with name " + req.params.code
                });
            }
            return res.status(500).send({
                message: "Error retrieving subject with code " + req.params.code
            });
        });
};

//update subject by knownAs
exports.updateByName = (req, res) => {
    //validate request
    if (!(req.body.code || req.body.name || req.body.sem || req.body.deptCode)) {
        return res.status(400).send({
            message: "Please insert data, Subject data can't be empty in body."
        });
    }

    Subject.findOneAndUpdate({ knownAs: { $regex: req.params.knownAs, $options: "i" } }, {
            code: req.body.code || code,
            name: req.body.name || name,
            knownAs: req.body.knownAs || knownAs,
            sem: req.body.sem || sem,
            deptCode: req.body.deptCode || deptCode
        }, {
            new: true
        })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Subject not found with knownAs " + req.params.knownAs
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Subject not found with knownAs " + req.params.knownAs
                });
            }
            return res.status(500).send({
                message: "Error retrieving subject with knownAs " + req.params.knownAs
            });
        });
};

//delete subject by code
exports.deleteByCode = (req, res) => {
    Subject.deleteOne({ code: req.params.code })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Subject not found with code " + req.params.code
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Subject not found with code " + req.params.code
                });
            }
            return res.status(500).send({
                message: "Error deleting subject with code " + req.params.code
            });
        });
};

//delete subject by code
exports.deleteByName = (req, res) => {
    Subject.deleteOne({ knownAs: { $regex: req.params.knownAs, $options: "i" } })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Subject not found with name " + req.params.knownAs
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Subject not found with name " + req.params.knownAs
                });
            }
            return res.status(500).send({
                message: "Error retrieving subject with name " + req.params.knownAs
            });
        });
};

//delete many subjects of specific sem and department
exports.deleteByDeptAndSem = (req, res) => {
    Subject.deleteMany({ deptCode: req.params.deptCode, sem: req.params.sem })
        .then(data => {
            if (data.deletedCount == 0) {
                return res.status(404).send({
                    message: "Subjects Not Found With Entered Dept " + req.params.deptCode + " And Sem " + req.params.sem + ".!"
                });
            }
            //res.send(data);

            return res.status(404).send({
                message: "Subjects Deleted Successfully With Entered Dept " + req.params.deptCode + " And Sem " + req.params.sem + ".!"
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving subjects."
            });
        });
};