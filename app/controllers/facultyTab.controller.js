const FacultyTab = require('../models/facultyTab.model.js');
const Common = require('../../common.js');

exports.createFacultyTab = (req, res) => {
    //validate the request
    if (!(req.body.name || req.body.title || req.body.description || req.body.facultyId || req.body.position)) {
        return res.status(400).send({
            message: "Please insert data."
        });
    }

    //create Lab And Workshop Data
    const facultyTab = new FacultyTab({
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        facultyId: req.body.facultyId,
        position: req.body.position,
        createdAtInt: Common.getDateInt(),
        updatedAtInt: Common.getDateInt()
    });

    //save the Data
    facultyTab.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating company"
            });
        });
};

//find all faculty tab data
exports.findAllFacultyTab = (req, res) => {
    //retrieving all the faculty tab data
    FacultyTab.find()
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Faculty Tab Details Not Found."
                });
            }
            res.send(data);
        }).catch(err => {
            return res.status(404).send({
                message: err.message || "Error while retrievig companies."
            });
        });
};

//find faculty tab data by id
exports.findFacultyTabById = (req, res) => {

    //finding by id
    FacultyTab.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Faculty Tab not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Faculty Tab not found with id " + req.params.id
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//find faculty tab by name
exports.findFacultyTabByFacultyId = (req, res) => {
    //find by name
    FacultyTab.find({ facultyId: req.params.facultyId })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Faculty tab details not found with id " + req.params.facultyId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Faculty tab details not found with id " + req.params.facultyId
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};


//update faculty tab by id or using id
exports.updateFacultyTabById = (req, res) => {
    //validate request
    if (!(req.body.name || req.body.title || req.body.description || req.body.facultyId || req.body.position)) {
        return res.status(400).send({
            message: "Please insert data."
        });
    }

    //updating data
    FacultyTab.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            title: req.body.title,
            description: req.body.description,
            facultyId: req.body.facultyId,
            position: req.body.position,
            updatedAtInt: Common.getDateInt()
        }, {
        new: true
    }).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Faculty Tab Not Found With id : " + req.params.id
            });
        }
        res.send(data)
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Faculty Tab Not Found With id : " + req.params.id
            });
        }
        return res.status(404).send({
            message: err.message || "Error while updating the data."
        });
    });
};


//delete faculty tab by id
exports.deleteFacultyTabById = (req, res) => {
    FacultyTab.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Faculty Tab Not Found With id : " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Faculty Tab Not Found With id : " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error deleting Placement with id " + req.params.id
            });
        });
};
