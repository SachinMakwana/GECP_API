const Achievements = require('../models/achievements.model.js');

exports.create = (req, res) => {
    if(!( req.body.title || req.body.description || req.body.image || req.body.category)){
        return res.status(400).send({
            message: "Achievements can't be empty"
        });
    }
    const achievements = new Achievements({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category
    });

    achievements.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAllAchievements = (req, res) => {
    Achievements.find().then( achieve => {
        res.send(achieve);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findById = (req, res) => {
    Achievements.findOne({ _id: req.params._id })
        .then(achieve => {
            if (!achieve) {
                return res.status(404).send({
                    message: "Achievements not found by ID " + req.params._id 
                });
            }
            res.send(achieve); 
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Achievements not found by ID " + req.params._id 
                });
            }
            return res.status(500).send({
                message: "Error retrieving By ID " + req.params._id 
            });
        });
};

exports.findByTitle = (req, res) => {
    Achievements.findOne({ title: req.params.title })
        .then(achieve => {
            if (!achieve) {
                return res.status(404).send({
                    message: "Achievements not found by Title " + req.params.title 
                });
            }
            res.send(achieve); 
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Achievements not found by Title " + req.params.title
                });
            }
            return res.status(500).send({
                message: "Error retrieving By Title " + req.params.title
            });
        });
};

exports.findByCategory = (req, res) => {
    Achievements.findOne({ category: req.params.category })
        .then(achieve => {
            if (!achieve) {
                return res.status(404).send({
                    message: "Achievements not found by Category " + req.params.category 
                });
            }
            res.send(achieve); 
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Achievements not found by Category " + req.params.category
                });
            }
            return res.status(500).send({
                message: "Error retrieving By Category " + req.params.category
            });
        });
};

 exports.updateByTitle = (req, res) => {
    if (!( req.body.title || req.body.description || req.body.image || req.body.category)) {
        return res.status(400).send({
            message: "Achievements details can not be empty"
        });
    }

Achievements.findOneAndUpdate({ title: req.params.title}, {
                                           
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category}, { new: true })
    .then(achieve => {
        if (!achieve) {
            return res.status(404).send({
                message: "Achievements not found with Title " + req.params.title
            });
        }
        res.send(achieve);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Achievements not found with Title " + req.params.title
            });
        }
        return res.status(500).send({
            message: "Error updating Achievements with Title " + req.params.title
        });
    });
}; 

exports.updateById = (req, res) => {
    if (!( req.body.title || req.body.description || req.body.image || req.body.category)) {
        return res.status(400).send({
            message: "Achievements details can not be empty"
        });
    }

Achievements.findOneAndUpdate({ _id: req.params._id}, {
                                           
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category}, { new: true })
    .then(achieve => {
        if (!achieve) {
            return res.status(404).send({
                message: "Achievements not found with id " + req.params._id
            });
        }
        res.send(achieve);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Achievements not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating Achievements with id " + req.params._id
        });
    });
}; 

exports.deleteByTitle = (req, res) => {
    Achievements.findOneAndRemove(req.params.title)
        .then(achieve => {
            if (!achieve || achieve.length == 0) {
                return res.status(404).send({
                    message: " Achievement not found with Title " + req.params.title
                });
            }
            res.send({ message: "Achievement deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Achievement not found with Title " + req.params.title
                });
            }
            return res.status(500).send({
                message: "Could not delete Achievement with Title " + req.params.title
            });
        });
}; 

exports.deleteById = (req, res) => {
    Achievements.findOneAndRemove(req.params._id)
        .then(achieve => {
            if (!achieve || achieve.length == 0) {
                return res.status(404).send({
                    message: " Achievement not found with id " + req.params._id
                });
            }
            res.send({ message: "Achievement deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Achievement not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete Achievement with id " + req.params._id
            });
        });
}; 


