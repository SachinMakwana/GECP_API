const LabWorkshop = require('../models/labWorkshop.model.js');
const Common = require('../../common.js');

exports.createLabWorkshop = (req, res) => {
    //validate the request
    if (!(req.body.name || req.body.category || req.body.image || req.body.deptCode || req.body.description)) {
        return res.status(400).send({
            message: "Please insert data."
        });
    }

    //create Lab And Workshop Data
    const labWorkshop = new LabWorkshop({
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        deptCode: req.body.deptCode,
        description: req.body.description,
        createdAtInt: Common.getDateInt(),
        updatedAtInt: Common.getDateInt()
    });

    //save the Data
    labWorkshop.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating company"
            });
        });
};

//find all lab and workshop data
exports.findAllLabWorkshop = (req, res) => {

    //retrieving all the lab and workshop data
    LabWorkshop.find()
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Lab or Workshop Not Found."
                });
            }
            res.send(data);
        }).catch(err => {
            return res.status(404).send({
                message: err.message || "Error while retrievig companies."
            });
        });
};

//find lab and workshop data by id
exports.findLabWorkshopById = (req, res) => {

    //finding by id
    LabWorkshop.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Lab or Workshop not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Lab or Workshop not found with id " + req.params.id
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//find lab or workshop by name
exports.findLabWorkshopByName = (req, res) => {
    //find by name
    LabWorkshop.find({ name: { $regex : req.params.name, $options: "i"} })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Lab or Workshop not found with name " + req.params.name
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Lab or Workshop not found with name " + req.params.name
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//find lab or workshop by category
exports.findLabWorkshopByCategory = (req, res) => {
    //find by category
    LabWorkshop.find({ category: req.params.category })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Lab or Workshop not found with category " + req.params.category
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Lab or Workshop not found with category " + req.params.category
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//find lab or workshop by department code
exports.findLabWorkshopByDeptCode = (req, res) => {
    //find by category
    LabWorkshop.find({ deptCode: req.params.deptCode })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Lab or Workshop not found with department code " + req.params.deptCode
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Lab or Workshop not found with department code " + req.params.deptCode
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//update lab or workshop by id or using id
exports.updateLabWorkshopById = (req, res) => {
    //validate request
    if (!(req.body.name || req.body.category || req.body.image || req.body.deptCode || req.body.description)) {
        return res.status(400).send({
            message: "Please insert data."
        });
    }

    //updating data
    LabWorkshop.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            category: req.body.category,
            image: req.body.image,
            deptCode: req.body.deptCode,
            description: req.body.description,
            updatedAtInt: Common.getDateInt()
        }, {
        new: true
    }).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Lab or workshop Not Found With id : " + req.params.id
            });
        }
        res.send(data)
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Lab or workshop not found with id " + req.params.id
            });
        }
        return res.status(404).send({
            message: err.message || "Error while updating the data."
        });
    });
};

//update lab or workshop by name
exports.updateLabWorkshopByName = (req, res) => {
    //validate request
    if (!(req.body.name || req.body.category || req.body.image || req.body.deptCode || req.body.description)) {
        return res.status(400).send({
            message: "Please insert data."
        });
    }

    //updating data
    LabWorkshop.findOneAndUpdate({ name: req.params.name },
        {
            name: req.body.name,
            category: req.body.category,
            image: req.body.image,
            deptCode: req.body.deptCode,
            description: req.body.description,
            updatedAtInt: Common.getDateInt()
        }, {
        new: true
    }).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Lab or workshop Not Found With name : " + req.params.name
            });
        }
        res.send(data)
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Lab or workshop not found with name " + req.params.name
            });
        }
        return res.status(404).send({
            message: err.message || "Error while updating the data."
        });
    });
};

//delete lab or workshop by id
exports.deleteLabWorkshopById = (req, res) => {
    LabWorkshop.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Lab or workshop not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Lab or workshop not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error deleting Placement with id " + req.params.id
            });
        });
};

//delete lab or workshop by name
exports.deleteLabWorkshopByName = (req, res) => {
    LabWorkshop.findOneAndDelete({ name: req.params.name })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Lab or workshop not found with name " + req.params.name
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Lab or workshop not found with name " + req.params.name
                });
            }
            return res.status(500).send({
                message: "Error deleting Placement with id " + req.params.name
            });
        });
};