const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//create express app
const app = express();

//parse requests of content-type  - aplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

//parse requests of content-type - application/json
app.use(bodyParser.json({limit: '50mb', extended: true}))

//enabling cors to allow interaction from other domain
app.use(cors({ origin: 'http://localhost:4200' }))


//configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database...', err);
    process.exit();
})

//define a simple route
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to GECP."
    });
});

//Require routes File
require('./app/routes/department.route.js')(app);
require('./app/routes/subject.route.js')(app);
require('./app/routes/company.route.js')(app);
require('./app/routes/placement/placement.route.js')(app);
require('./app/routes/placement/placement_attachments.route')(app);
require('./app/routes/placement/placement_memberDetails.route')(app);
require('./app/routes/labworkshop.route.js')(app);
require('./app/routes/faculty.route.js')(app);
require('./app/routes/facultyTab.route.js')(app);
require('./app/routes/affiliation.route')(app);
require('./app/routes/anti-ragging/anti_ragging_details.route')(app);
require('./app/routes/anti-ragging/anti_ragging_attachments.route')(app);
require('./app/routes/anti-ragging/anti_ragging_memberDetails.route')(app);


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});