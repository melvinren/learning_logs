var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');

var MongoClient = require('mongodb').MongoClient;
var mongo_url = 'mongodb://localhost:27017/learning_logs';
var moment = require('moment');

var app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.all('*', (req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.get('/', (req,res) => {
    res.send('hello service')
})

app.post('/mongo', (req, res)=>{
    
    MongoClient.connect(mongo_url, function(err, db){
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
            db.close();
            res.json(topics);
        })
        // db.close();
        // res.send('connected mongod success');        
    })
})

app.post('/api/topic', (req, res)=>{
    var topic = req.body;
    if(topic._id){
        //edit
    }else{
        //insert
        MongoClient.connect(mongo_url, function(err, db){
            if(err){
                db.close();
                res.send(500, {"error": err, "msg":"connect mongo fail"})
                return;
            }           
           
            var topics = db.collection('topics');
            topics.insertMany([{"text":topic.text, "date": moment().format("YYYY-MM-DD HH:mm:ss")}], (err, result) => {
                if(err){
                    db.close();
                    res.send(500, {"error":err, "msg":"insert topic fail"})
                    return;
                }
                db.close();
                res.send({"success":1});
            })
        });
    }
})

var port = 11111;
app.listen(port, function(){
    console.log(`server is running, port is ${port}`)
})