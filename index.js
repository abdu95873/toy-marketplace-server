const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = 5000 || process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mh16alw.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const trucksCollection = client.db('kidstoy').collection('trucks');

        app.get('/trucks', async (req,res) => {
            let query = {};

            if(req.query.subCategory){
                query = {
                    subCategory: req.query.subCategory
                }
            };

            const trucks = await trucksCollection.find(query).toArray();
            res.send(trucks);
        });

        app.post('/toy', async (req, res) => {
            const body = req.body;
            const result = await trucksCollection.insertOne(body);
            res.send(result);
          });

        app.get('/', (req,res) => {
            res.send('Kidstoy is running');
        });
    }
    finally{

    }

}
run().catch(console.log);


app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
})