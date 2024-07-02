const fs = require('fs');

const updateStatus = (req, res) => {

  var currentYear = '';
    const d = new Date();
    currentYear = d.getFullYear().toString();
    
    const { id, name, topic, year, status, subject, term } = req.body;
  
    // Read existing data
    fs.readFile(`json/${currentYear}/submitted.json`, (err, data) => {
      if (err) {
        return res.status(500).send("Error reading file");
      }
  
      let jsonData = JSON.parse(data);
      var user
  
      try {
        user = jsonData.submittedTopics.find(topicx => topicx.id === id && topicx.name === name && topicx.topic === topic && topicx.year === year && topicx.subject === subject && topicx.term === term);
  
        user.status = status;
  
        // console.log(jsonData)
  
        // Write updated data back to the file
        fs.writeFile(
          `json/${currentYear}/submitted.json`,
          JSON.stringify(jsonData, null, 2),
          (err) => {
            if (err) {
              return res.status(500).send("Error writing file");
            }
            res.status(200).send("Topic updated successfully");
          }
        );
      } catch (error) {
        console.error('Error parsing subject:', error);
      }
      
    });
};

module.exports = updateStatus;