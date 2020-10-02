const subject = require('../models/subject.model');
const common = require('../common');
// Create and Save a new Subject
exports.create = (req, res) => {
	// Validate request
    if(!req.body.code) {
        return res.status(400).send({
            message: "code can not be empty"
        });
    }

    // Create a Subject
    const Subject = new subject({
        code: req.body.code,
       name: req.body.name,
       knownAs:req.body.knownAs,
       semester:req.body.semester,
       deptName:req.body.deptName,

    });

    // Save subject in the database
    Subject.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Subject."
        });
    });

};

// Retrieve and return all subjects from the database.
 exports.findAll = (req, res) => {

 	subject.find()
    .then(subjects => {
        res.send(subjects);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving subjects."
        });
    });

 };

// // Find a single subject with a code
 exports.findCode = (req, res) => {

 	subject.findOne({code:req.params.code})
    .then(subjects => {
        if(!subjects) {
            return res.status(404).send({
                message: "subject not found with code " + req.params.code
            });            
        }
        res.send(subjects);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "subjects not found with code " + req.params.code
            });                
        }
        return res.status(500).send({
            message: "Error retrieving subject with code " + req.params.code
        });
    });

 };
// //Find a single subject with a name
 exports.findName = (req, res) => {

 	subject.findOne({knownAs:req.params.knownAs})
    .then(subjects => {
        if(!subjects) {
            return res.status(404).send({
                message: "subject not found with known_As " + req.params.knownAs
            });            
        }
        res.send(subjects);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "subjects not found with known_As " + req.params.knownAs
            });                
        }
        return res.status(500).send({
            message: "Error retrieving subject with known_As " + req.params.knownAs
        });
    });

 };

//  //Find a single subject with a departemnt and sem
 exports.findDeptSem = (req, res) => {

 	subject.find({dept_Id:req.params.dept_Id, semester:req.params.semester})
    .then(subjects => {
        if(!subjects) {
            return res.status(404).send({
                message: "subject not found " + req.params.semester
            });            
        }
        res.send(subjects);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "subjects not found  " + req.params.semester
            });                
        }
        return res.status(500).send({
            message: "Error retrieving subject " + req.params.semester
        });
    });

 };
// // Update a subject with id
 exports.update = (req, res) => {
 	 // Validate Request
    if(!req.body.code) {
        return res.status(400).send({
            message: "codecan not be empty"
        });
    }

    // Find subject and update it with the request body
    subject.findByIdAndUpdate(req.params.subjectId, {
        code: req.body.code, 
         name: req.body.name,
         knownAs:req.body.knownAs,
         semester:req.body.semester,
         deptName:req.body.deptName,
       
    }, {new: true})
    .then(subjects => {
        if(!subjects) {
            return res.status(404).send({
                message: "subject not found with id " + req.params.subjectId
            });
        }
        res.send(subjects);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "subjects not found with id " + req.params.subjectId
            });                
        }
        return res.status(500).send({
            message: "Error updating subjects with id " + req.params.subjectId
        });
    });

 };

// // Delete a subject with the specified code in the request
 exports.delete = (req, res) => {

 	subject.findByIdAndRemove(req.params.subjectId)
    .then(subjects => {
        if(!subjects) {
            return res.status(404).send({
                message: "subject not found with id " + req.params.subjectId
            });
        }
        res.send({message: "subject deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "subject not found with id " + req.params.subjectId
            });                
        }
        return res.status(500).send({
            message: "Could not delete subjects with id " + req.params.subjectId
        });
    });

 };

