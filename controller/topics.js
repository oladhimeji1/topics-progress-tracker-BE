const fs = require('fs');

const getAllTopics = (req, res) => {
  var currentYear = '';
  const d = new Date();
  currentYear = d.getFullYear().toString()
    fs.readFile(`json/${currentYear}/topics.json`, { encoding: "utf8" }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
        res.send(data);
      }
    });
};

module.exports = getAllTopics;