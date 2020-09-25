const Faculty = require('../models/faculty.model.js');
const Common = require('../../common.js');

exports.createFaculty = (req, res) => {
    //validate the request
    if (!(req.body.prefix || req.body.surname || req.body.firstName || req.body.lastName || req.body.designation || req.body.qualification || req.body.experience || req.body.areaOfInterest || req.body.gender || req.body.dob || req.body.doj || req.body.maritialStatus || req.body.address || req.body.contactNo || req.body.phoneNo || req.body.email || req.body.profileImage || req.body.deptCode)) {
        return res.status(400).send({
            message: "Please insert data."
        });
    }

    //create Lab And Workshop Data
    const faculty = new Faculty({

        prefix: req.body.prefix,
        surname: req.body.surname,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        designation: req.body.designation,
        qualification: req.body.qualification,
        experience: req.body.experience,
        areaOfInterest: req.body.areaOfInterest,
        gender: req.body.gender,
        dob: req.body.dob,
        doj: req.body.doj,
        maritialStatus: req.body.maritialStatus,
        address: req.body.address,
        contactNo: req.body.contactNo,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        profileImage: req.body.profileImage,
        deptCode: req.body.deptCode,
        createdAtInt: Common.getDateInt(),
        updatedAtInt: Common.getDateInt()
    });

    //save the Data
    faculty.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating company"
            });
        });
};

//find all faculty data
exports.findAllFaculty = (req, res) => {

    //retrieving all the faculty data
    Faculty.find()
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Faculty Data Not Found."
                });
            }
            res.send(data);
        }).catch(err => {
            return res.status(404).send({
                message: err.message || "Error while retrievig data."
            });
        });
};

//find faculty data by id
exports.findFacultyById = (req, res) => {

    //finding by id
    Faculty.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Faculty not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Faculty not found with id " + req.params.id
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//find faculty by name
exports.findFacultyByName = (req, res) => {
    //find by name
    Faculty.find({ firstName: { $regex: req.params.name, $options: "i" } })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Faculty not found with name " + req.params.name
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Faculty not found with name " + req.params.name
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//find faculty by category
exports.findFacultyByDesignation = (req, res) => {
    //find by category
    Faculty.find({ designation: req.params.designation })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Faculty not found with designation " + req.params.designation
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Faculty not found with designation " + req.params.designation
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//find faculty by department code
exports.findFacultyByDeptCode = (req, res) => {
    //find by category
    Faculty.find({ deptCode: req.params.deptCode })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Faculty not found with department code " + req.params.deptCode
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Faculty not found with department code " + req.params.deptCode
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//update faculty by id or using id
exports.updateFacultyById = (req, res) => {
    //validate request
    if (!(req.body.prefix || req.body.surname || req.body.firstName || req.body.lastName || req.body.designation || req.body.qualification || req.body.experience || req.body.areaOfInterest || req.body.gender || req.body.dob || req.body.doj || req.body.maritialStatus || req.body.address || req.body.contactNo || req.body.phoneNo || req.body.email || req.body.profileImage || req.body.deptCode)) {
        return res.status(400).send({
            message: "Please insert data."
        });
    }

    //updating data
    Faculty.findByIdAndUpdate(req.params.id,
        {
            prefix: req.body.prefix,
            surname: req.body.surname,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            designation: req.body.designation,
            qualification: req.body.qualification,
            experience: req.body.experience,
            areaOfInterest: req.body.areaOfInterest,
            gender: req.body.gender,
            dob: req.body.dob,
            doj: req.body.doj,
            maritialStatus: req.body.maritialStatus,
            address: req.body.address,
            contactNo: req.body.contactNo,
            phoneNo: req.body.phoneNo,
            email: req.body.email,
            profileImage: req.body.profileImage,
            deptCode: req.body.deptCode,
            updatedAtInt: Common.getDateInt()
        }, {
        new: true
    }).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Faculty Not Found With id : " + req.params.id
            });
        }
        res.send(data)
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Faculty not found with id " + req.params.id
            });
        }
        return res.status(404).send({
            message: err.message || "Error while updating the data."
        });
    });
};

//delete lab or workshop by id
exports.deleteFacultyById = (req, res) => {
    Faculty.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Faculty not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Faculty not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error deleting Placement with id " + req.params.id
            });
        });
};
