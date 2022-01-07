const express = require("express");
const app = express();
const cors = require("cors");

const { MongoClient } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.weui7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("JMCourier");
    const userInformationCollection = database.collection("user-information");

    // POST user information API
    app.post("/userInformation", async (req, res) => {
      const userInformation = req.body;
      const result = await userInformationCollection.insertOne(userInformation);
      res.json(result);
      console.log(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

require("dotenv").config();
app.get("/", (req, res) => {
  res.send("Hello I am ready! What is up?");
});

app.listen(port, () => {
  console.log("Listening at port :", port);
});
