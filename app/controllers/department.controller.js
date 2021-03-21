const department = require('../models/department.model');

// Create new department
exports.create = (req, res) => {
    // Validate request
    let { body } = req;
    if (!req.body.code) {
        return res.status(400).send({
            message: "Code can not be empty"
        });
    }

    // Create a dept
    const dept = new department(body);

    // Save dept in the database
    dept.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the dept."
            });
        });
};


// Retrieve and return all dept from the database.
exports.findAll = (req, res) => {
    department.find()
        .then(gecps => {
            res.send(gecps);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving department."
            });
        });

};

// // Find department with a code
exports.findDept = (req, res) => {
    let { code } = req.query
    department.findOne({ code: code })
        .then(gecp => {
            if (!gecp) {
                return res.status(404).send({
                    message: "department not found  " + code
                });
            }
            res.send(gecp);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "department not found " + code
                });
            }
            return res.status(500).send({
                message: "Error retrieving code " + code
            });
        });

};
// // Find departname with a name
exports.findName = (req, res) => {
    department.findOne({ name: req.params.name })
        .then(gecp => {
            if (!gecp) {
                return res.status(404).send({
                    message: "department not found  " + req.params.name
                });
            }
            res.send(gecp);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "code not found " + req.params.name
                });
            }
            return res.status(500).send({
                message: "Error retrieving department " + req.params.name
            });
        });

};
// // Update a department identified by the code in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.code) {
        return res.status(400).send({
            message: "code content can not be empty"
        });
    }

    // Find and update it with the request body
    department.findByIdAndUpdate(req.params.deptId, {
        code: req.body.code,
        name: req.body.name,
        image: req.body.image,
        about: req.body.about
    }, { new: true })
        .then(gecp => {
            if (!gecp) {
                return res.status(404).send({
                    message: "department not found with id " + req.params.deptId
                });
            }
            res.send(gecp);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "department not found with id " + req.params.deptId
                });
            }
            return res.status(500).send({
                message: "Error updating department with id " + req.params.deptId
            });
        });

};

// // Delete a code with the specified code in the request
exports.delete = (req, res) => {
    department.findByIdAndRemove(req.params.deptId)
        .then(gecp => {
            if (!gecp) {
                return res.status(404).send({
                    message: "department not found with id " + req.params.deptId
                });
            }
            res.send({ message: " deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "department not found with id " + req.params.deptId
                });
            }
            return res.status(500).send({
                message: "Could not delete department with id " + req.params.deptId
            });
        });

};