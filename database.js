new Vue({
    el: '#database',
    data: {
        logs: [],
    },
    method:{
        showScores: function () {
            const MongoClient = require('mongodb').MongoClient;
            const uri = "mongodb+srv://admin:2rU3bL8SvEJOrzw1@base1-9j22b.mongodb.net/test?retryWrites=true&w=majority";
            const client = new MongoClient(uri, {useNewUrlParser: true});
            client.connect(err => {
                const collection = client.db("sample_mflix").collection("users");
                this.logs = collection;
                client.close();
            });
        }
    },
});

/*
function scoreTable() {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://user:Dk8aBNUpn6JuJha5@base1-9j22b.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {useNewUrlParser: true});
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
        alert("mongodb connected!");
    });
}

//admin:2rU3bL8SvEJOrzw1



scoreTable: function(){
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://admin:2rU3bL8SvEJOrzw1@base1-9j22b.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {useNewUrlParser: true});
    client.connect(err => {
        const collection = client.db("sample_mflix").collection("users");
        // perform actions on the collection object
        client.close();
        alert("mongodb connected!");
    });
},
*/