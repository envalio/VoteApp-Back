const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
let db;
const app = express();
const url = 'mongodb://localhost:27017';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));

app.use((req, res, next) => {
    const countLog = {
        url: req.url,
        json: req.body,
        date: (new Date()).toJSON()
    };
    db.collection("logs").insert(countLog, (err, result) => {
        if (err) {
            console.log(`Log was not recorded! ${err}`);
            next();
        }
        console.log(`Log was recorded`);
        next();
    })
    
});

app.get("/", (req, res) => {
    console.log(db)
    res.send("Hello, you in Vote app page. But this is backand page, and you need go to http://localhost:3000/");
})

app.get("/votes", (req, res) => {
    db.collection("votes").find().toArray((err, docs) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.send(docs);
    })
})

app.post("/vote", (req, res) => {
    
    const countvote = {
        number: req.body.number,
        date: (new Date()).toJSON()
    }
    db.collection("votes").insert(countvote, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500)
        }
        res.send(`You vote for ${countvote.number} confirmed`);
    })

})
app.get("/statistic", (req, res) => {
    const statisticDate = req.body.date;
    if(!statisticDate) {
        db.collection("votes").find().toArray((err, docs) => {
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            }
            const result = [];
            docs.map( (item) => {
                const currentNumberItem = result.find( (currentItem) => {
                    return currentItem.number == item.number;
                })
                if(currentNumberItem) {
                    currentNumberItem.count++;
                } else {
                    result.push({
                        number: item.number,
                        count: "1"
                    })
                }
            })
            res.send(result);
        } );} else {
            db.collection("votes").find().toArray((err, docs) => {
                if(err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                const result = [];
                    const test = docs.filter(item => item.date.slice(0,10) === statisticDate)
                    .map( (item) => {
                    const currentNumberItem = result.find( (currentItem) => {
                        return currentItem.number == item.number;
                    })
                    if(currentNumberItem) {
                        currentNumberItem.count++;
                    } else {
                        result.push({
                            number: item.number,
                            count: "1"
                        })
                    }
                })
                res.send({statisticDate, result});
            } );
        }
})

app.get("/logs", (req, res) => {
    db.collection("logs").find().toArray((err, docs) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        console.log(req.body)
        res.send(docs);
    })
})

mongodb.MongoClient.connect(url, (err, client) => {
    db = client.db('voteapp');
    console.log("Connected successfully to server");
    app.listen(3030, () => {
        console.log('api app works')
    });

})