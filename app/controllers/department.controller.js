const Dept = require('../models/department.model.js');

//create and save a new department details
exports.create = (req, res) => {
    //validate request
    if (!req.body.code || !req.body.name || !req.body.about) {
        return res.status(400).send({
            message: "Please insert data"
        });
    }

    //Create a department
    const dept = new Dept({
        code: req.body.code,
        name: req.body.name,
        image: req.body.image,
        about: req.body.about
    });

    //save the dept
    dept.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating databse."
            });
        });
};


//find all departments
exports.findAll = (req, res) => {
    Dept.find()
        .then(dept => {
            res.send(dept);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving departments."
            });
        });
};

//find a single department with code or name
/*exports.findOne = (req,res) => {
    Dept.findOne({code: req.params.code},function(err,dept){
        if(!dept) {
            if(err){
                return res.status(404).send({
                    message: "Department not found with id " + req.params.code
                });
            }
            return res.status(404).send({
                message: "Department Not found with code " + req.params.code
            });
        }
        res.send(dept);
    });
};*/

//find a single department with code
exports.findOneByCode = (req, res) => {
    Dept.findOne({ code: req.params.code })
        .then(dept => {
            if (!dept) {
                return res.status(404).send({
                    message: "Department not found with code " + req.params.code
                });
            }
            res.send(dept);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Department not found with code " + req.params.code
                });
            }
            return res.status(500).send({
                message: "Error retrieving department with code " + req.params.code
            });
        });
};


//find a single department with name
exports.findOneByName = (req, res) => {
    Dept.findOne({ name: { $regex: req.params.name, $options: "i" } })
        .then(dept => {
            if (!dept) {
                return res.status(404).send({
                    message: "Department not found with name " + req.params.name
                });
            }
            res.send(dept);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Department not found with name " + req.params.name
                });
            }
            return res.status(500).send({
                message: "Error retrieving department with name " + req.params.name
            });
        });
};


exports.updateByCode = (req,res) => {
    //validate request
    if (!req.body.name || !req.body.image || !req.body.about) {
        return res.status(400).send({
            message: "Please insert data of department in body"
        });
    }

    //updating
    Dept.findOneAndUpdate({code : req.params.code},{
        name: req.body.name,
        image: req.body.image,
        about: req.body.about
    },{
        new:true
    })
    .then(dept => {
        if (!dept) {
            return res.status(404).send({
                message: "Department not found with code " + req.params.code
            });
        }
        res.send(dept);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Department not found with code " + req.params.code
            });
        }
        return res.status(500).send({
            message: "Error retrieving department with code " + req.params.code
        });
    });
};

//delete by dept code
exports.deleteByCode = (req,res) => {
    Dept.deleteOne({code: req.params.code})
    .then(dept => {
        if (!dept) {
            return res.status(404).send({
                message: "Department not found with code " + req.params.code
            });
        }
        res.send(dept);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Department not found with code " + req.params.code
            });
        }
        return res.status(500).send({
            message: "Error retrieving department with code " + req.params.code
        });
    });
};