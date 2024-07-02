const fs = require('fs');

const updateTopic = (req, res) => {

  var currentYear = '';
    const d = new Date();
    currentYear = d.getFullYear().toString();
    
    const { year, subject, term, newTopic } = req.body;
  
    // Read existing data
    fs.readFile(`json/${currentYear}/topics.json`, (err, data) => {
      if (err) {
        return res.status(500).send("Error reading file");
      }
  
      let jsonData = JSON.parse(data);
  
      // Add the new topic
      if (
        jsonData.classes[year] &&
        jsonData.classes[year].subjects[subject] &&
        jsonData.classes[year].subjects[subject][term]
      ) {
        jsonData.classes[year].subjects[subject][term].push(newTopic);
  
        // Write updated data back to the file
        fs.writeFile(
          `json/${currentYear}/topics.json`,
          JSON.stringify(jsonData, null, 2),
          (err) => {
            if (err) {
              return res.status(500).send("Error writing file");
            }
            res.status(200).send("Topic added successfully");
          }
        );
      } else {
        res
          .status(400)
          .send(
            "The class, subject, or term you try to update might not exist. Kindly contact the admin"
        );
      }
    });
};

module.exports = updateTopic;