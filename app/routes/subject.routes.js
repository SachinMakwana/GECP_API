module.exports = (app) => {
    const subject = require('../controllers/subject.controller');

    // Create a new subject
    app.post('/subject', subject.create);

    // // Retrieve all subject
     app.get('/subject', subject.findAll);

    // // Retrieve a single subject with code
     app.get('/subject/bycode/:code', subject.findCode);

     // // Retrieve a single subject with known_As
     app.get('/subject/byname/:knownAs', subject.findName);

// // Retrieve a single subject with department and semester
     app.get('/subject/bydeptsem/:dept_Id/:semester', subject.findDeptSem);
   
    // // Update a subject with id
     app.put('/subject/:subjectId', subject.update);


    // // Delete a subject with code
     app.delete('/subject/:subjectId', subject.delete);

    
}