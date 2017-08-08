var friends = require("../data/friends");
var fs = require("fs");

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {
    var totalDifference = 40;
    var bestMatch = Math.floor(Math.random() * friends.length);
    for (var i = 0; i < friends.length; i++) {
      var individualDifference = 0;
      for (var j = 0; j < friends[i].scores.length; j++) {
        individualDifference += Math.abs(parseInt(friends[i].scores[j]) - parseInt(req.body.scores[j]));
      }
      if (individualDifference <= totalDifference) {
        totalDifference = individualDifference;
        bestMatch = i;
      }
    }
    friends.push(req.body);
    fs.writeFile(__dirname + "/../data/friends.js", "var friends = " + JSON.stringify(friends) + ";\nmodule.exports = friends;", function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Added new Friend!");
    });
    res.json(friends[bestMatch]);
  });
};
