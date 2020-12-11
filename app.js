const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;
// getting-started.js mongoose
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://0.0.0.0:27017/contactarch', { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => handleError(error));

//define mongoose schema
const contact1Schema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    desc: String
});

const Contact1 = mongoose.model('Contact1', contact1Schema);


// app.use(express.static('public', options))

//express specific stuff
app.use('/public', express.static('public')) //to use static files     
app.use(express.urlencoded()) //helps in expressing form data       

//pug specific stuff
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

//endpoints
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('index.pug', params)
});

app.get("/about", (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params)
});
app.get("/home", (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params)
});
app.get("/portfolio", (req, res) => {
    const params = {}
    res.status(200).render('portfolio.pug', params)
});
app.get("/projects", (req, res) => {
    const params = {}
    res.status(200).render('projects.pug', params)
});
app.get("/book", (req, res) => {
    const params = {}
    res.status(200).render('book.pug', params)
});
app.get("/contact", (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params)
});
app.post("/contact", (req, res) => {
    var myData = new Contact1(req.body);
    myData.save().then(() => {
        res.send("We'll Contact you soon.")
    }).catch(() => {
        res.status(404).send("Item not saved.")
    });

    // res.status(200).render('contact.pug')
});

//start server
app.listen(port,'0.0.0.0', () => {
    console.log(`The application started successfully on port ${port}`)
});