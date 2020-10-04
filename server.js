const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
let db;
const app = express();
const url = 'mongodb://localhost:27017';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));

app.get("/", (req, res) => {
    console.log(db)
    res.send("Hello, you in Vote app page. But this is backand page, and you need go to http://localhost:3000/");
})

const logging = (url, req) => {
    const countLog = {
        url: url,
        json: req.body,
        date: new Date()
    };
    db.collection("logs").insert(countLog, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500)
        }
        console.log(`Log was recorded`);
    })
};

app.get("/votes", (req, res) => {
    db.collection("votes").find().toArray((err, docs) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        logging("/votes", req);
        res.send(docs);
    })
})

app.post("/vote", (req, res) => {
    const countvote = {
        number: req.body.number,
        date: new Date()
    }
    db.collection("votes").insert(countvote, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500)
        }
        logging("/vote", req);
        res.send(`You vote for ${countvote.number} confirmed`);
    })

})

app.get("/statistic", (req, res) => {
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
        logging("/statistic", req);
        res.send(result);
    } );
})

app.get("/logs", (req, res) => {
    db.collection("logs").find().toArray((err, docs) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        // logging("/logs", req);
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