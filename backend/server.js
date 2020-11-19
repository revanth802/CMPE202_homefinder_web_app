//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var configValues = require('./config/mongoconfig')

app.set('view engine', 'ejs');
// require('dotenv').config();



const { mongoDB } = require('./config/mongoconfig');


//use cors to allow cross origin resource sharing
app.use(cors({ origin: configValues.frontendURL, credentials: true }));



app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(passport.initialize());
// app.use(passport.session());

//require('./config/passport')(passport);


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', configValues.frontendURL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//mongodb connection
const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

app.use(express.json());
var loginRouter = require('./api/login/login.router');
var registerRouter = require('./api/register/register.router');

var adminRouter = require('./api/admin/admin.router');
var homeListingRouter =  require('./api/homelistings/homelisting.router');

// var categoryRouter = require('./api/category/category.router');
// var cardRouter = require('./api/card/card.router');
app.use('/login', loginRouter);
app.use('/register',registerRouter);
app.use('/admin',adminRouter);
app.use('/homelistings',homeListingRouter);

// app.use('/category', categoryRouter);
// app.use('/card', cardRouter);

//start your server on port 3001
module.exports = app.listen(3001);
console.log("Server Listening on port 3001");