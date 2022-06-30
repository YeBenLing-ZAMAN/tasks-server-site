const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        app.get('/billing_list/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const bill = await billingCollection.findOne(filter);
            // console.log(bill);
            res.send(bill);
          })

        app.post('/add_billing', async (req, res) => {
            const bill = req.body;
            const result = await billingCollection.insertOne(bill);
            res.send(result);
        })

        app.patch('/update_billing/:id', async (req, res) => {
            const id = req.params.id;
            const updateBillInfo = req.body;
            // console.log(updateBillInfo);
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
              $set: {
                full_name: updateBillInfo.name,
                email:updateBillInfo.email,
                paid_amount:updateBillInfo.amount,
                phone:updateBillInfo.phone
              }
            }
            const result = await billingCollection.updateOne(filter, updateDoc);
            res.send(result);
          })

        app.delete('/deletebilling/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            // console.log(filter);
            const result = await billingCollection.deleteOne(filter);
            res.send(result);
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