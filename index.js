const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


// =====================================
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hbcvbmv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// =====================================
const port = 30000;
const app = express();

// =========== middleware ==============
app.use(cors());
app.use(bodyParser.json());
// =====================================

app.get('/', (req, res) =>{
    res.send(`power X gym is running..`)
})

// =====================================

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const membershipCollection = client.db('powerXData').collection("membership");
  //   ===================================
  app.post('/addMembership', (req, res)=>{
    const membership = req.body;
    
    membershipCollection.insertOne(membership)
    .then(result =>{
        res.send(result.insertCount > 0);
    })
  })

  app.get('/memberInfo', (req, res)=>{
    membershipCollection.find({})
    .toArray((err, documents) =>{
      res.send(documents)
    })
  })
});

// sevrer web address

app.listen(process.env.PORT || port );