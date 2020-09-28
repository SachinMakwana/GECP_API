const news = require('../models/news.models');
const common = require('../common');
//create and save news

exports.create = (req,res) =>{

	//validate request
	if(!req.body.title){
		return res.status(400).send({
			message : "title cannot be empty"
		});
	}

	//create news

	const News = new news({
		title: req.body.title,
        image: req.body.image,
        description : req.body.description

	});

//save news info in database

	News.save()
	.then(data=>{
		res.send(data);
	}).catch(err=>{
		res.status(500).send({
			message: err.message || "Some error occurred while creating the news info."
		});
	});
};

//retrive and return all the news from database

exports.findAll = (req,res) =>{

	news.find()
	.then(newss =>{
		res.send(newss);
	}).catch(err=>{
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving newss."
		});
	});

};

//find news info with id
exports.findById = (req, res) => {

 	news.findById(req.params.newsId)
    .then(newss => {
        if(!newss) {
            return res.status(404).send({
                message: "no news found with ID " + req.params.newsId
            });            
        }
        res.send(newss);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "no news found with ID " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving News with ID " + req.params.newsId
        });
    });

 };



//find news info with title
exports.findtitle = (req, res) => {

 	news.findOne({title:req.params.title})
    .then(newss => {
        if(!newss) {
            return res.status(404).send({
                message: "no news found with title " + req.params.title
            });            
        }
        res.send(newss);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "no news found with title " + req.params.title
            });                
        }
        return res.status(500).send({
            message: "Error retrieving News with title " + req.params.title
        });
    });

 };


//find news info with title
exports.findlink = (req, res) => {

 	news.findOne({linkPath:req.params.linkPath})
    .then(newss => {
        if(!newss) {
            return res.status(404).send({
                message: "no news found with link " + req.params.linkPath
            });            
        }
        res.send(newss);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "no news found with link " + req.params.linkPath
            });                
        }
        return res.status(500).send({
            message: "Error retrieving News with link " + req.params.linkPath
        });
    });

 };


// // Update a news info with id
 exports.updateId = (req, res) => {
 	 // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "title not be empty"
        });
    }

    // Find news info and update it with the request body
    news.findByIdAndUpdate(req.params.newsId, {
        title: req.body.title,
        image: req.body.image,
        description : req.body.description
    }, {new: true})
    .then(newss => {
        if(!newss) {
            return res.status(404).send({
                message: " newss info not found with id " + req.params.newsId
            });
        }
        res.send(newss);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "newss info not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Error updating News info with id " + req.params.newsId
        });
    });

 };


// // Delete a news info with the specified id in the request
 exports.deleteById = (req, res) => {

 	news.findByIdAndRemove(req.params.newsId)
    .then(newss => {
        if(!newss) {
            return res.status(404).send({
                message: "newss not found with id " + req.params.newsId
            });
        }
        res.send({message: "newss deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "newss not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete News with id " + req.params.newsId
        });
    });

 };
