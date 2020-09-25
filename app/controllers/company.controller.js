const Company = require('../models/company.model.js');

exports.create = (req, res) => {
    //validate the request
    if (!(req.body.name || req.body.description || req.body.logo)) {
        return res.status(400).send({
            message: "Please insert data."
        });
    }

    //create Company
    const company = new Company({
        name: req.body.name,
        description: req.body.description,
        logo: req.body.logo
    });

    //save the company
    company.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating company"
            });
        });
};

//find all company
exports.findAllCompany = (req, res) => {
    //retrieving all the company

    Company.find()
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Company Not Found."
                });
            }
            res.send(data);
        }).catch(err => {
            return res.status(404).send({
                message: err.message || "Error while retrievig companies."
            });
        });
};

//find company by id
exports.findCompanyById = (req, res) => {
    //finding by id

    Company.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Company not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Company not found with id " + req.params.id
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//find company by name
exports.findCompanyByName = (req, res) => {
    //find by name
    Company.findOne({ name: { $regex: req.params.name, $options: "i" } })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Company not found with name : " + req.params.name
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Company not found with name " + req.params.name
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};

//update company by id or using id
exports.updateCompanyById = (req, res) => {
    //validate request
    if (!(req.body.name || req.body.description || req.body.logo)) {
        return res.status(400).send({
            message: "Please insert data."
        });
    }

    //updating data
    Company.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            logo: req.body.logo
        }, {
        new: true
    }).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Company Not Found With id : " + req.params.id
            });
        }
        res.send(data)
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.id
            });
        }
        return res.status(404).send({
            message: err.message || "Error while updating the data."
        });
    });
};

//update company by name
exports.updateCompanyByName = (req, res) => {
    //validate request
    if (!(req.body.name || req.body.description || req.body.logo)) {
        return res.status(400).send({
            message: "Please insert data."
        });
    }

    //updating data
    Company.findOneAndUpdate({ name: { $regex: req.params.name, $options: "i" } },
        {
            name: req.body.name,
            description: req.body.description,
            logo: req.body.logo
        }, {
        new: true
    }).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Company Not Found With name : " + req.params.name
            });
        }
        res.send(data)
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with name " + req.params.name
            });
        }
        return res.status(404).send({
            message: err.message || "Error while updating the data."
        });
    });
};

//delete company by id
exports.deleteCompanyById = (req, res) => {
    Company.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Company not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Company not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error deleting company with id " + req.params.id
            });
        });
}

//delete company by name
exports.deleteCompanyByName = (req, res) => {
    Company.findOneAndDelete({ name: { $regex: req.params.name, $options: "i" } })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Company not found with name " + req.params.name
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Company not found with name " + req.params.name
                });
            }
            return res.status(500).send({
                message: "Error deleting company with name " + req.params.name
            });
        });
}