const fs = require('fs');

const submitTopic = (req, res) => {
  var currentYear = '';
  const d = new Date();
  currentYear = d.getFullYear().toString();

    const { id, name, topic, year, status, subject, term, newChartDataValue } =
      req.body;
  
    // Read existing data
    fs.readFile(`json/${currentYear}/submitted.json`, (err, data) => {
      if (err) {
        return res.status(500).send("Error reading file");
      }
  
      let jsonData = JSON.parse(data);
      // console.log(req.body);
  
      // Check if the topic and label index exist
      if (jsonData.submittedTopics) {
  
        jsonData.submittedTopics.push(req.body);
    
        // Write updated data back to the file
        fs.writeFile(
          `json/${currentYear}/submitted.json`,
          JSON.stringify(jsonData, null, 2),
          (err) => {
            if (err) {
              return res.status(500).send("Error writing file");
            }
            // res.status(200).send("Topic added successfully");
          }
        );
      } else {
      // res.status(400).send(
      //     "The class, subject, or term you try to update might not exist. Kindly contact the admin"
      //     );
      }
    });
};

module.exports = submitTopic;