module.exports = (app) => {
    const company = require('../controllers/company.controller.js')

    //create the company
    app.post('/company',company.create);

    //find all the companies
    app.get('/company',company.findAllCompany);

    //find company by id
    app.get('/company/:id',company.findCompanyById)

    //find company by name
    app.get('/company/name/:name',company.findCompanyByName);

    //updating company by id
    app.put('/company/:id',company.updateCompanyById);

    //updating company by name
    app.put('/company/name/:name',company.updateCompanyByName);

    //delete a company by id
    app.delete('/company/:id',company.deleteCompanyById);

    //delete a company by name
    app.delete('/company/name/:name',company.deleteCompanyByName);
}