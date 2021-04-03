const womendetail = require('../../models/women_cell/women_detail.models');
const common = require('../../../common');
//create and save wd info

exports.create = (req, res) => {

    //validate request
    if (!req.body.women_description) {
        return res.status(400).send({
            message: "cannot be empty"
        });
    }

    //create wd info

    const WomenDetail = new womendetail({
        women_description: req.body.women_description,

    });

    //save info in database

    WomenDetail.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the  info."
            });
        });
};



//retrive and return all the info from database

exports.findOne = (req, res) => {

    womendetail.findOne()
        .then(womendetails => {
            res.send(womendetails);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving data."
            });
        });

};
// // Update a wd info with id
exports.updateId = (req, res) => {
    let { body } = req;
    let { _id } = body;
    // Validate Request
    /* if(!req.body.women_description) {
        return res.status(400).send({
            message: "id not be empty"
        });
    } */

    // Find  info and update it with the request body
    womendetail.findByIdAndUpdate(_id, body, { new: true })
        .then(womendetails => {
            if (!womendetails) {
                return res.status(404).send({
                    message: "info not found with id " + _id
                });
            }
            res.send(womendetails);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "info not found with id " + _id
                });
            }
            return res.status(500).send({
                message: "Error updating info with id " + _id
            });
        });

};








