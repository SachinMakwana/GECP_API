const Placement = require('../../models/placement/placement.model');
const Common = require('../../../common.js');

exports.createPlacement = (req, res) => {
    //validate the request
    if (!(req.body.dateOfCampus || req.body.companyId || req.body.deptCode || req.body.studentsTaken || req.body.lowestPkg || req.body.highestPkg)) {
        return res.status(400).send({
            message: "Please insert data."
        });
    }

    //create Placement Data
    const placement = new Placement({
        dateOfCampus: req.body.dateOfCampus,
        companyId: req.body.companyId,
        deptCode: req.body.deptCode,
        studentsTaken: req.body.studentsTaken,
        lowestPkg: req.body.lowestPkg,
        highestPkg: req.body.highestPkg,
        createdAtInt: Common.getDateInt(),
        updatedAtInt: Common.getDateInt()
    });

    //save the placement
    placement.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating company"
            });
        });
};

//find all placement data
exports.findAllPlacement = (req, res) => {

    //retrieving all the placement data
    Placement.find()
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Placement Not Found."
                });
            }
            res.send(data);
        }).catch(err => {
            return res.status(404).send({
                message: err.message || "Error while retrievig companies."
            });
        });
};

//find placement by id
exports.findPlacementById = (req, res) => {

    //finding by id
    Placement.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Placement not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Placement not found with id " + req.params.id
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//find placement by date of campus
exports.findPlacementByDateOfCampus = (req, res) => {
    //find by name
    Placement.find({ dateOfCampus: { $regex: req.params.dateOfCampus, $options: "i" } })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Placement not found with date of campus : " + req.params.dateOfCampus
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Placement not found with date of campus : " + req.params.dateOfCampus
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//find placement by company id
exports.findPlacementByCompanyId = (req, res) => {
    //find by name
    Placement.find({ companyId: req.params.companyId })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Placement not found with companyId : " + req.params.companyId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Placement not found with companyId : " + req.params.companyId
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//find placement data from package range
exports.findPlacementByPackageRange = (req, res) => {
    //find by name
    Placement.find({ lowestPkg :{ $lte: req.params.lowestPkg } , highestPkg: { $gte: req.params.highestPkg }})
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Placement not found in range : " + req.params.lowestPkg + " and " + req.params.highestPkg
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Placement not found in range : " + req.params.lowestPkg + " and " + req.params.highestPkg
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//find placement data by students taken or greater
exports.findPlacementByStudentsTaken = (req, res) => {
    //find by name
    Placement.find({ studentsTaken : { $gte: req.params.students }})
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Placement not found with minimum students : " + req.params.students + " \nTry Enetring Different Numbers"
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Placement not found with minimum students : " + req.params.students + " \nTry Enetring Different Numbers"
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};


//update placement by id or using id
exports.updatePlacementById = (req, res) => {
    //validate request
    if (!(req.body.dateOfCampus || req.body.companyId || req.body.deptCode || req.body.studentsTaken || req.body.lowestPkg || req.body.highestPkg)) {
        return res.status(400).send({
            message: "Please insert data."
        });
    }

    //updating data
    Placement.findByIdAndUpdate(req.params.id,
        {
            dateOfCampus: req.body.dateOfCampus,
            companyId: req.body.companyId,
            deptCode: req.body.deptCode,
            studentsTaken: req.body.studentsTaken,
            lowestPkg: req.body.lowestPkg,
            highestPkg: req.body.highestPkg,
            updatedAtInt: Common.getDateInt()
        }, {
        new: true
    }).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Placement Not Found With id : " + req.params.id
            });
        }
        res.send(data)
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Placement not found with id " + req.params.id
            });
        }
        return res.status(404).send({
            message: err.message || "Error while updating the data."
        });
    });
};

//delete placement by id
exports.deletePlacementById = (req,res) => {
    Placement.findByIdAndDelete(req.params.id)
    .then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Placement not found with id " + req.params.id
            });
        }
        res.send(data);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Placement not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error deleting Placement with id " + req.params.id
        });
    });
}
