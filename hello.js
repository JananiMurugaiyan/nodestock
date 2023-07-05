//Stock market portfolio by Janani

console.log("Hello World!");
const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

//set handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

const maincontent = "Hello everyone, here is the maincontent of the page created by Jan";

//set handlebars routes
app.get('/', (req, res) => {
    res.render('home', {
        stuff: maincontent
    });
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT,() => console.log('server listening on port '+ PORT));
