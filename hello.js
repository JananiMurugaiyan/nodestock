//Stock market portfolio by Janani

console.log("Hello World!");
const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


//API key  pk_e93cd29358994da8a9c6c6f402f72427
//create call_api function
function call_api(finishedAPI, ticker){
    request('https://cloud.iexapis.com/stable/stock/' +ticker+ '/quote?token=pk_e93cd29358994da8a9c6c6f402f72427', { json : true }, (err, res, body) => {
   if(err) { return console.log(err); }
   console.log(body);
   if(res.statusCode === 200){
    //console.log(body);
    finishedAPI(body);
   };
 });
};



//set handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

const maincontent = "Hello everyone, here is the maincontent of the page created by Jan";

//set handlebars index GET routes
app.get('/', function(req, res) {
    call_api(function(doneAPI){
      res.render('home', {
        stock: doneAPI
      });  
    }, "fb");
    
});

//set handlebars index POST routes
app.post('/', function(req, res) {
    call_api(function(doneAPI){
        //posted_stuff = req.body.stock_ticker;
        res.render('home', {
        stock: doneAPI
      });  
    }, req.body.stock_ticker);
    
});

//create about page routes
app.get('/about.html', function(req, res) {
    res.render('about');
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT,() => console.log('server listening on port '+ PORT));
