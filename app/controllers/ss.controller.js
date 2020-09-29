const ss = require('../models/ss.models');
const fs = require('fs');
const common = require('../../common');


//create and save a new ss details
exports.create = (req, res) => {
    //validate request
    if (!req.body.ss_title || !req.body.ss_fileName || !req.body.file) {
        return res.status(400).send({
            message: "Please insert data"
        });
    }

    //Create a student section
    const Ss = new ss({
        ss_title: req.body.ss_title,
        ss_fileName: req.body.ss_fileName,
        ss_filePath: "./Uploads/ss/" +req.body.ss_fileName
    });

    //save the details
    let buff = new Buffer.from(req.body.file, 'base64');
    fs.writeFileSync(Ss.ss_filePath, buff);

    Ss.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating databse."
            });
        });
};



//retrive and return all the ss from database

exports.findAll = (req,res) =>{

	ss.find()
	.then(sss =>{
		res.send(sss);
	}).catch(err=>{
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving info."
		});
	});

};

//find ss by id
exports.findNssById = (req, res) => {
    //finding by id
    ss.findById(req.params.ssId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "ss not found with id " + req.params.ssId
                });
            }
            const contents = fs.readFileSync(data.ss_filePath, {encoding: 'base64'});
            data.set('File',contents.toString(),{strict:false});
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "ss not found with id " + req.params.ssId
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};




exports.updateId = (req, res) => {
    //validate request
    if (!req.body.ss_title || !req.body.ss_fileName || !req.body.ss_filePath) {
        return res.status(400).send({
            message: "Please insert data of ss in body"
        });
    }

    //save the ss
    if(req.body.file != null) {
        let buff = new Buffer.from(req.body.file, 'base64');
        let ss_filePath =  "./Uploads/ss/" +req.body.ss_fileName
        fs.writeFileSync(ss_filePath, buff);
        console.log("file Updated");
    }

    //updating
    ss.findByIdAndUpdate(req.params.ssId, {
        ss_title: req.body.ss_title,
        ss_fileName: req.body.ss_fileName,
        ss_filePath: "./Uploads/ss/" +req.body.ss_fileName
    }, {
        new: true
    }).then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "ss not found with id " + req.params.ssId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "ss not found with id " + req.params.ssId
                });
            }
            return res.status(500).send({
                message: "Error retrieving nss with id " + req.params.ssId
            });
        });
};


// // Delete a ss info with the specified id in the request
 exports.deleteById = (req, res) => {

 	ss.findOneAndRemove(req.params.ssId)
    .then(sss => {
        if(!sss) {
            return res.status(404).send({
                message: "info not found with id " + req.params.ssId
            });
        }
        res.send({message: "info deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "info not found with id " + req.params.ssId
            });                
        }
        return res.status(500).send({
            message: "Could not delete info with id " + req.params.ssId
        });
    });

 };



