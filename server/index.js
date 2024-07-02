const express = require("express");
const niceList = require("../utils/niceList.json");
const verifyProof = require("../utils/verifyProof");
const MerkleTree = require("../utils/MerkleTree");

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT = new MerkleTree(niceList).getRoot();

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  const isInTheList = verifyProof(body.proof, body.name, MERKLE_ROOT);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
