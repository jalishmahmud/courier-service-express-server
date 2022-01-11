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
    const areaCollection = database.collection("area");
    const districtCollection = database.collection("district");
    const upojelaCollection = database.collection("upojela");
    const locationCollection = database.collection("location");
    // userInformationCollection =======================================
    // POST user information API
    app.post("/userInformation", async (req, res) => {
      const userInformation = req.body;
      const result = await userInformationCollection.insertOne(userInformation);
      res.json(result);
    });

    // configuration ============================================
    // POST new area
    app.post("/addNewArea", async (req, res) => {
      const userInformation = req.body;
      const result = await areaCollection.insertOne(userInformation);
      res.json(result);
    });
    // GET all aria
    app.get("/getAllArea", async (req, res) => {
      const cursor = areaCollection.find({});
      const areas = await cursor.toArray();
      res.json(areas);
    });
    // POST new District
    app.post("/addNewDistrict", async (req, res) => {
      const userInformation = req.body;
      const result = await districtCollection.insertOne(userInformation);
      res.json(result);
    });
    // GET all district
    app.get("/getAllDistrict", async (req, res) => {
      const cursor = districtCollection.find({});
      const district = await cursor.toArray();
      res.json(district);
    });
    // POST new Upojela
    app.post("/addNewUpojela", async (req, res) => {
      const userInformation = req.body;
      const result = await upojelaCollection.insertOne(userInformation);
      res.json(result);
    });
    // GET new Upojela
    app.get("/getAllUpojela", async (req, res) => {
      const cursor = upojelaCollection.find({});
      const upojela = await cursor.toArray();
      res.json(upojela);
    });

    // POST new Location
    app.post("/addNewLocation", async (req, res) => {
      const userInformation = req.body;
      const result = await locationCollection.insertOne(userInformation);
      res.json(result);
    });

    //=============================================================
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
