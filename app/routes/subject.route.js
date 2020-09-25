module.exports = (app) => {
    const sub = require('../controllers/subject.controller.js');

    //Create or add a new subject
    app.post('/subject', sub.create);

    //find all subjects
    app.get('/subject', sub.findAll);

    //find by subject code
    app.get('/subject/:code', sub.findBySubCode);

    //find by subject knownAS
    app.get('/subject/knownAs/:knownAs', sub.findBySubName);

    //find subject by deptCode and sem
    app.get('/subject/:deptCode/:sem', sub.findByDeptAndSem);

    //update by subject code
    app.put('/subject/update/:code', sub.updateByCode);

    //update by subject knownAs
    app.put('/subject/updateByKnownAs/:knownAs', sub.updateByName);

    //delete by subject code
    app.delete('/subject/delete/:code', sub.deleteByCode);

    //delete by subject knownAs
    app.delete('/subject/deleteByKnownAs/:knownAs', sub.deleteByName);

    //delete by subject knownAs
    app.delete('/subject/delete/:deptCode/:sem', sub.deleteByDeptAndSem);
}