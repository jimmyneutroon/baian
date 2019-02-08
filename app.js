/*
|------------------------------------------------------
|  REQUIRING
|------------------------------------------------------
| import all packages 
|
*/
var express = require('express'); // requiring the express module
var app = express(); // declare the app variable
var path = require('path') // import the path object to deal with pathes in the applcation
var bodyParser = require('body-parser') // to handle requests body coming from the user
var session = require('express-session')
var cookieParser = require('cookie-parser') // to Parse Cookie header and populate req.cookies with an object keyed by the cookie names
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
const PORT = 5000; // port of the application





/*
|------------------------------------------------------
|  MIDDLEWARES & AAUTHENTICATION
|------------------------------------------------------
| this is the middlewares that will be executed by the application
|
*/
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) // returns middleware that only parses json
app.use(passport.initialize()); // to initialize passpotr
app.use(passport.session()); // initialize the session in passport object
app.use(cookieParser()) // initialize the package of cookie-parser
app.use(session({
  secret: 'yugHGgfui83hd',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: false }
}))

// passport.use(new LocalStrategy(
//   function(username, password, done) {

//   }
// ));






/*
|------------------------------------------------------
|  CONFIGURATIONS
|------------------------------------------------------
| this is the configuration of the application like view engin and the path of view and so on 
|
*/
app.set('view engine', 'pug') // declare the pug as template engine 
app.set('views', path.join(__dirname, 'views')); // set the path of the view folder
app.use(express.static('public')) // set the path of the public folder
app.use(flash);





/*
|------------------------------------------------------
|  ROUTES
|------------------------------------------------------
| this routes comes from routes folder in the root directory of the app
|
*/
app.get('/', function(req, res){
  res.render('home', {title: 'Home Page'})
})

var userRoute = require('./routes/user'); // import the route of the user page 
userRoute(app); // fire the route

var loginRoute = require('./routes/login') // import the route of the login page 
loginRoute(app) // fire the route

var registerRoute = require('./routes/register') // import the route of the login page 
registerRoute(app) // fire the route




/*
|------------------------------------------------------
|  LISTENING
|------------------------------------------------------
| here we can handle listening to the port
|
*/
app.listen(PORT, function (){
  console.log(`port: ${PORT}`)
})