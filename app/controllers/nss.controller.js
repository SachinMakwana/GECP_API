const nss = require('../models/nss.models');
const fs = require('fs');
const common = require('../../common');
//create and save nss info

//create and save a new nss info
exports.create = (req, res) => {
    //validate request
    if (!req.body.nss_title || !req.body.nss_fileName || !req.body.file) {
        return res.status(400).send({
            message: "Please insert data"
        });
    }

    //Create a nss
    const Nss = new nss({
        nss_title: req.body.nss_title,
        nss_fileName: req.body.nss_fileName,
        nss_filePath: "./Uploads/nss/" +req.body.nss_fileName
    });

    //save the nss
    let buff = new Buffer.from(req.body.file, 'base64');
    fs.writeFileSync(Nss.nss_filePath, buff);

    Nss.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating databse."
            });
        });
};



//retrive and return nss info

exports.findAll = (req,res) =>{

	nss.find()
	.then(nsss =>{
		res.send(nsss);
	}).catch(err=>{
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving info."
		});
	});

};

//find nss by id
exports.findNssById = (req, res) => {
    //finding by id
    nss.findById(req.params.nssId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Nss not found with id " + req.params.nssId
                });
            }
            const contents = fs.readFileSync(data.nss_filePath, {encoding: 'base64'});
            data.set('File',contents.toString(),{strict:false});
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Nss not found with id " + req.params.nssId
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};


//Update nss info

exports.updateId = (req, res) => {
    //validate request
    if (!req.body.nss_title || !req.body.nss_fileName || !req.body.nss_filePath) {
        return res.status(400).send({
            message: "Please insert data of nss in body"
        });
    }

    //save the nss
    if(req.body.file != null) {
        let buff = new Buffer.from(req.body.file, 'base64');
        let nss_filePath =  "./Uploads/nss/" +req.body.nss_fileName
        fs.writeFileSync(nss_filePath, buff);
        console.log("file Updated");
    }

    //updating
    nss.findByIdAndUpdate(req.params.nssId, {
        nss_title: req.body.nss_title,
        nss_fileName: req.body.nss_fileName,
        nss_filePath: "./Uploads/nss/" +req.body.nss_fileName
    }, {
        new: true
    }).then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Nss not found with id " + req.params.nssId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Nss not found with id " + req.params.nssId
                });
            }
            return res.status(500).send({
                message: "Error retrieving nss with id " + req.params.nssId
            });
        });
};


// // Delete a nss info with the specified id in the request
 exports.deleteById = (req, res) => {

 	nss.findOneAndRemove(req.params.nssId)
    .then(nsss => {
        if(!nsss) {
            return res.status(404).send({
                message: "info not found with id " + req.params.nssId
            });
        }
        res.send({message: "info deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "info not found with id " + req.params.nssId
            });                
        }
        return res.status(500).send({
            message: "Could not delete info with id " + req.params.nssId
        });
    });

 };



