const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
let cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://dhaouiaziz13:Dhaoui2708@cluster0.cxxvc.mongodb.net/score?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const Schema = new mongoose.Schema({
  name: {
    type: String,
  },
  score: {
    type: Number,
  },
  id: {
    type: Number,
  },
});
const player = mongoose.model("player", Schema);
let players;

app.post("/save", async (req, res) => {
  await player
    .deleteMany({ id: { $gte: 1 } })
    .then(function () {
      console.log("success"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });

  for (let i = 0; i < req.body.data.length; i++) {
    const element = req.body.data[i];
    await player.create({
      name: element.name,
      score: element.score,
      id: element.id,
    });
  }
});
app.get("/data", async (req, res) => {
  await player
    .find({})
    .exec()
    .then((data) => (players = data));
  res.json(players);
});

app.listen(port, () => console.log(`Example app listening on port port!`));
