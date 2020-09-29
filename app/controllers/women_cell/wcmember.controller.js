const wcmember = require('../../models/women_cell/wcmember.model');
const common = require('../../../common');
// Create and Save a new wcm
exports.create = (req, res) => {
	// Validate request
    if(!(req.body.wc_name || req.body.wc_role || req.body.wc_designation || req.body.wc_department)) {
        return res.status(400).send({
            message: "code can not be empty"
        });
    }

    // Create a wcm
    const WcMember = new wcmember({
        wc_name: req.body.wc_name,
        wc_role: req.body.wc_role,
        wc_designation: req.body.wc_designation,
        wc_department: req.body.wc_department
    });

    // Save wcm in the database
    WcMember.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the info."
        });
    });

};

// Retrieve and return all wcm from the database.
 exports.findAll = (req, res) => {

 	wcmember.find()
    .then(wcmembers => {
        res.send(wcmembers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving wcm."
        });
    });

 };
// // Update a wcm with id
 exports.update = (req, res) => {
 	 // Validate Request
    if(!(req.body.wc_name || req.body.wc_role || req.body.wc_designation || req.body.wc_department)) {
        return res.status(400).send({
            message: " not be empty"
        });
    }

    // Find wcm and update it with the request body
    wcmember.findByIdAndUpdate(req.params.wcId, {
        wc_name: req.body.wc_name,
        wc_role: req.body.wc_role,
        wc_designation: req.body.wc_designation,
        wc_department: req.body.wc_department
    }, {new: true})
    .then(wcmembers => {
        if(!wcmembers) {
            return res.status(404).send({
                message: "not found with id " + req.params.wcId
            });
        }
        res.send(wcmembers);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " not found with id " + req.params.wcId
            });                
        }
        return res.status(500).send({
            message: "Error updating with id " + req.params.wcId
        });
    });

 };

// // Delete a wcm with the specified code in the request
 exports.delete = (req, res) => {

 	wcmember.findByIdAndRemove(req.params.wcId)
    .then(wcmembers => {
        if(!wcmembers) {
            return res.status(404).send({
                message: " not found with id " + req.params.wcId
            });
        }
        res.send({message: "wcm deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "wcm not found with id " + req.params.wcId
            });                
        }
        return res.status(500).send({
            message: "Could not delete  with id " + req.params.wcId
        });
    });

 };

