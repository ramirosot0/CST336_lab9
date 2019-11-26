var express = require('express');
var app = express();

const mysql = require('mysql');
require('dotenv').config();

//app.use(require('body-parser').json());
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));


//handlebars
var hbs = require('express-handlebars');
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({extname : 'hbs', defaultLayout: 'layout', layoutsDir: __dirname+'/views/layouts'}));
app.set('view engine', 'hbs');


var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var mysqlConnection = mysql.createConnection({
    host: 'mcldisu5ppkm29wf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'vp4onqntwtnhnl44',
    password: 'eqgdpotw2735k904',
    database: 'oww96xtpilfl3guz'
});

mysqlConnection.connect((err)=>{
   if (!err)
       console.log('connection succeded.');
   else
       console.log('connection failed' + JSON.stringify(err,undefined,2));
});

app.get("/", (req, res)=>{

    res.render("layouts/layout", { title: 'Quotes'
    });
});

app.post('/quotes', (req, res, next)=>{

    const key = req.body.keyword;
    const cate = req.body.category;
    const name = req.body.author;
    const gend = req.body.gender;

    if (key.length > 1){
        mysqlConnection.query(`SELECT * from author_quotes where quote LIKE '%${key}%'`,(error, results, fields)=>{
            if (error)  console.log(err);
            console.log("the quotes are: ", results);

            res.render('layouts/layout', {
                title: 'quotes back',
                quotes: results
            });
        });
    }
    else if (cate.length > 1){
        mysqlConnection.query(`SELECT * from author_quotes where category = '${cate}'`,(error, results, fields)=>{
            if (error)  console.log(err);
            console.log("the quotes are: ", results);

            res.render('layouts/layout', {
                title: 'quotes back',
                quotes: results
            });
        });
    }
    else if (name.length > 1){
        mysqlConnection.query(`SELECT * from author_quotes where fullname Like '%${name}%'`,(error, results, fields)=>{
            if (error)  console.log(err);
            console.log("the quotes are: ", results);

            res.render('layouts/layout', {
                title: 'quotes back',
                quotes: results

            });
        });
    }
    else if (gend.length >= 1){
        mysqlConnection.query(`SELECT * from author_quotes where gender =  '${gend}'`,(error, results, fields)=>{
            if (error)  console.log(err);
            console.log("the quotes are: ", results);

            res.render('layouts/layout', {
                title: 'quotes back',
                quotes: results

            });
        });
    }
    else {
            res.render('layouts/layout', {
                title: 'Only fill one line.',

            });
    }
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});