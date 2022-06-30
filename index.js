const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;


/* middleware */
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://<username>:<password>@cluster0.phion.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("jobs_tasks").collection("bill");
  // perform actions on the collection object
  console.log('db connected');
  client.close();
});



app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})