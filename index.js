const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;


/* middleware */
app.use(cors());
app.use(express.json());

/* basic connect with mongodb and create a client */
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.phion.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const billingCollection = client.db("jobs_tasks").collection("billing_info");


        /* routes */
        app.get('/billing_list', async (req, res) => {
            const bills = await billingCollection.find().toArray();
            res.send(bills);
        })

    } finally {
        // Ensures that the client will close when you finish/error
        //   await client.close();
    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello World! this is zaman ! connected sucessfully')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})