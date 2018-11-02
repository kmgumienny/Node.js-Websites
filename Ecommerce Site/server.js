const express = require('express');
const hbs = require("express-handlebars");
var path = require('path');
var routes = require('./routes/index');
var control = require('./routes/control');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();


app.engine( 'hbs', hbs( {
    helpers: {
        getUsername: function(){
            return 'Log in ya bum';
        }

    },
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
} ) );

app.set('view engine', 'hbs');

app.use((req, res, next) =>{
    // check to see users cookies so we can steal their data or check if theyre logged in
   next();


});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'oogabooga',
    resave: false,
    saveUninitialized: true
}));

app.use('/', routes);
app.use('/control', control);

app.listen(process.env.PORT || 8080, ()=>{
    console.log('Server is listening on port 8080');
});
