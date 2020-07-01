const express = require('express');
const router = express.Router();
const url = "mongodb+srv://admin:WmOdCtaa6opFwewP@base1-9j22b.mongodb.net/test?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
router.use(cors());

router.get('/score', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        let db = client.db('Hightscores');
        db.collection('Player').find().sort({Score: -1}).limit(6).toArray(function (err, result) {
            if (err) throw err;
            else
                res.send(result);
        });
    });
});
router.get('/score2', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        let db = client.db('Hightscores');
        db.collection('Player').find().sort({Player: 1}).limit(6).toArray(function (err, result) {
            if (err) throw err;
            else
                res.send(result);
        });
    });
});
router.post('/add/:player-:hiScore', function (req, res) {
    let name = req.params.player.toUpperCase();
    let score = req.params.hiScore;
    let hiScore = { Player: name, Score: score};
    MongoClient.connect(url, function (err, client) {
        let db = client.db('Hightscores');
        db.collection("Player").insertOne(hiScore, function(err) {
            if (err) throw err;
            else
                res.send(true);
        });
    });
});
module.exports = router;

