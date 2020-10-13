const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

//create express app
const app = express();

//parse requests of content-type  - aplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

//parse requests of content-type - application/json
app.use(bodyParser.json({ limit: '50mb', extended: true }))

app.use(passport.initialize());
app.use(passport.session());

//enabling cors to allow interaction from other domain
app.use(cors({ origin: 'http://localhost:4200' }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

//define a simple route
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to Government Engineering College,Patan."
    });
});

//Require routes File
require('./app/routes/department.route.js')(app);
require('./app/routes/subject.route.js')(app);
require('./app/routes/company.route.js')(app);
require('./app/routes/labworkshop.route.js')(app);
require('./app/routes/faculty.route.js')(app);
require('./app/routes/facultyTab.route.js')(app);
require('./app/routes/affiliation.route')(app);
require('./app/routes/achievements.route.js')(app);
require('./app/routes/campus.route.js')(app);
require('./app/routes/contactInfo.route.js')(app);
require('./app/routes/attachments.route.js')(app);
require('./app/routes/subject.route')(app);
require('./app/routes/college.routes')(app);
require('./app/routes/gallery.routes')(app);
require('./app/routes/news.routes')(app);
require('./app/routes/nss.routes')(app);
require('./app/routes/ss.routes')(app);
require('./app/routes/user.route')(app);

require('./app/routes/placement/placement.route.js')(app);
require('./app/routes/placement/placement_attachments.route')(app);
require('./app/routes/placement/placement_memberDetails.route')(app);

require('./app/routes/anti-ragging/anti_ragging_details.route')(app);
require('./app/routes/anti-ragging/anti_ragging_attachments.route')(app);
require('./app/routes/anti-ragging/anti_ragging_memberDetails.route')(app);

require('./app/routes/women_cell/women_detail.routes')(app);
require('./app/routes/women_cell/wcmember.routes')(app);
require('./app/routes/women_cell/womenattach.routes')(app);

require('./app/routes/ssip/ssip_details.route')(app);
require('./app/routes/ssip/ssip_memberDetails.route')(app);
require('./app/routes/ssip/ssip_attachments.route')(app);

require('./app/routes/grievence/grievence_memberDetails.route')(app);
require('./app/routes/grievence/grievence_attachments.route')(app);


app.listen(3000, () => {
    console.log("Server is listening on port : 3000");
});