const womenattach = require('../../models/women_cell/womenattach.models');
const fs = require('fs');
const common = require('../../../common');
//create

//create and save 
exports.create = (req, res) => {
    //validate request
    if (!req.body.wca_title || !req.body.wca_fileName || !req.body.file) {
        return res.status(400).send({
            message: "Please insert data"
        });
    }

    //Create
    const WomenAttach = new womenattach({
        wca_title: req.body.wca_title,
        wca_fileName: req.body.wca_fileName,
        wca_filePath: "./Uploads/wca/" +req.body.wca_fileName
    });

    //save
    let buff = new Buffer.from(req.body.file, 'base64');
    fs.writeFileSync(WomenAttach.wca_filePath, buff);

    WomenAttach.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating databse."
            });
        });
};



//retrive and return all the info from database

exports.findAll = (req,res) =>{

	womenattach.find()
	.then(womenattachs =>{
		res.send(womenattachs);
	}).catch(err=>{
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving info."
		});
	});

};

//find by id
exports.findwcaById = (req, res) => {
    //finding by id
    womenattach.findById(req.params.wcaId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: " not found with id " + req.params.wcaId
                });
            }
            const contents = fs.readFileSync(data.wca_filePath, {encoding: 'base64'});
            data.set('File',contents.toString(),{strict:false});
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "not found with id " + req.params.wcaId
                });
            }
            return res.status(404).send({
                message: err.message || "Error while retieving the data."
            });
        });
};


//Update

exports.updateId = (req, res) => {
    //validate request
    if (!req.body.wca_title || !req.body.wca_fileName || !req.body.wca_filePath) {
        return res.status(400).send({
            message: "Please insert data of  in body"
        });
    }

    //save
    if(req.body.file != null) {
        let buff = new Buffer.from(req.body.file, 'base64');
        let wca_filePath =  "./Uploads/wca/" +req.body.wca_fileName
        fs.writeFileSync(wca_filePath, buff);
        console.log("file Updated");
    }

    //updating
    womenattach.findByIdAndUpdate(req.params.wcaId, {
        wca_title: req.body.wca_title,
        wca_fileName: req.body.wca_fileName,
        wca_filePath: "./Uploads/wca/" +req.body.wca_fileName
    }, {
        new: true
    }).then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "not found with id " + req.params.wcaId
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "not found with id " + req.params.wcaId
                });
            }
            return res.status(500).send({
                message: "Error retrieving nss with id " + req.params.wcaId
            });
        });
};


// // Delete info with the specified id in the request
 exports.deleteById = (req, res) => {

 	womenattach.findOneAndRemove(req.params.wcaId)
    .then(womenattachs => {
        if(!womenattachs) {
            return res.status(404).send({
                message: "info not found with id " + req.params.wcaId
            });
        }
        res.send({message: "info deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "info not found with id " + req.params.wcaId
            });                
        }
        return res.status(500).send({
            message: "Could not delete info with id " + req.params.wcaId
        });
    });

 };



