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
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/', (req,res) => {
    res.send('hello service')
})

app.post('/mongo', (req, res)=>{
    
    MongoClient.connect(mongo_url, function(err, db){
        // console.log('connect mongo db');
        
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

app.post('/api/topics/get/:pageIndex?/:pageSize?', (req, res)=>{
    var topic = req.body;        
    let pageIndex = req.params.pageIndex || 1;
    let pageSize = parseInt(req.params.pageSize) || 10;    
    MongoClient.connect(mongo_url, function(err, db){
        // console.log('connect mongo db');
        
        if(err){
            console.error(err)
            db.close();
            res.send('connect mongodb fail');
        }
        var topics = db.collection('topics');
        var filter = {};
        var ObjectID = require('mongodb').ObjectID;
        if(topic._id){
            filter = {"_id": new ObjectID(topic._id)};
        }
        topics.find(filter).sort({update_date:-1}).skip((pageIndex-1)*pageSize).limit(pageSize).toArray( (err, topics) =>{
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
    console.log(topic);
        //insert
        MongoClient.connect(mongo_url, function(err, db){
            if(err){
                db.close();
                res.send(500, {"error": err, "msg":"connect mongo fail"})
                return;
            }
           
            var topics = db.collection('topics');
            if(topic._id){
                var ObjectID = require('mongodb').ObjectID;
                topics.findOneAndUpdate(
                        {"_id": new ObjectID(topic._id)}, 
                        {$set: { text: topic.text, entries: topic.entries, update_date: moment().format("YYYY-MM-DD HH:mm:ss")}}, 
                        (err, topics) =>{
                    if(err){
                        console.log('edit topic error');
                        db.close()
                        res.send('edit topic error')
                    }
                    db.close();
                    res.send({"success":1});
                })
            }else{
                const date = moment().format("YYYY-MM-DD HH:mm:ss");
                topics.insertMany([{"text":topic.text, "date": date, "update_date":date}], (err, result) => {
                    if(err){
                        db.close();
                        res.send(500, {"error":err, "msg":"insert topic fail"})
                        return;
                    }
                    db.close();
                    res.send({"success":1, topics: result.ops});
                })
            }
    });
    
})

app.post('/api/topic/delete', (req, res)=>{
    var topic = req.body;
    if(!topic._id){        
        console.log('id is empty!')
        return res.send({"status":"error", "msg": "id is empty!"});        
    }
    MongoClient.connect(mongo_url, function(err, db){
        if(err){
            db.close();
            res.send(500, {"error": err, "msg":"connect mongo fail"})
            return;
        }
        
        var topics = db.collection('topics');            
        var ObjectID = require('mongodb').ObjectID;
        topics.findOneAndDelete(
                {"_id": new ObjectID(topic._id)}, 
                (err, topics) =>{
            if(err){
                console.log('edit topic error');
                db.close()
                res.send('edit topic error')
            }
            db.close();
            res.send({"success":1});
        })            
    });    
})

var port = 11111;
app.listen(port, function(){
    console.log(`server is running, port is ${port}`)
})