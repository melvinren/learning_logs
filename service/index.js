var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');

var MongoClient = require('mongodb').MongoClient;

var app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.all('*', (req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.get('/', (req,res) => {
    console.log(req.url);
    res.send('hello service')
})

app.post('/mongo', (req, res)=>{
    var url = 'mongodb://localhost:27017/learning_logs';
    MongoClient.connect(url, function(err, db){
        console.log('connect mongo db');
        
        if(err){
            console.error(err)
            db.close();
            res.send('connect mongodb fail');
        }
        var topics = db.collection('topics');
        topics.find({}).toArray( (err, topics) =>{
            if(err){
                console.log('find topic error');
                db.close()
                res.send('find topic error')
            }
            console.log(topics);
            const topicshtml = topics.map(topic=> "<li>"+topic.text+"</li>").join('');
            db.close();
            res.send(`<ul>${topicshtml}</ul>`);
        })
        // db.close();
        // res.send('connected mongod success');        
    })
})

var port = 1111;
app.listen(port, function(){
    console.log(`server is running, port is ${port}`)
})