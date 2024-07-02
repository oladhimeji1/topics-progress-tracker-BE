const fs = require('fs');

const submitted = (req, res) => {
  var currentYear = '';
  const d = new Date();
  currentYear = d.getFullYear().toString();

    if(!fs.existsSync(`json/${currentYear}`)){
      fs.mkdir(`json/${currentYear}`, err => {
        if(err){
          res.status(404).send('An error occure, please contact the developer for debugging');
        } else {
  
          var submittedTopics = []
          var updatedJsonData = JSON.stringify(submittedTopics, null, 2)
          
          fs.writeFile(
            `json/${currentYear}/submitted.json`,
            JSON.stringify(updatedJsonData, null, 2),
            (err) => {
              if (err) {
                return res.status(500).send("Error writing file");
              }
              res.status(200).send("Topic submitted successfully");
            }
          );
          res.status(200).send('Welcome to ' + currentYear);
        }
      })
    } else {
      fs.readFile(`json/${currentYear}/submitted.json`, { encoding: "utf8" }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(data);
          res.send(data);
        }
      });
    }
};

module.exports = submitted;