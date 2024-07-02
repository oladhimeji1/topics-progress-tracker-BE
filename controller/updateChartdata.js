const fs = require('fs');

const updateChartdata = (req, res) => {
  var currentYear = '';
  const d = new Date();
  currentYear = d.getFullYear().toString();
  
    const { year, subject, term, topicIndex, labelIndex, newChartDataValue } =
      req.body;
  
    // Read existing data
    fs.readFile(`json/${currentYear}/topics.json`, (err, data) => {
      if (err) {
        return res.status(500).send("Error reading file");
      }
  
      let jsonData = JSON.parse(data);
  
      // Check if the topic and label index exist
      if (
        jsonData.classes[year] &&
        jsonData.classes[year].subjects[subject] &&
        jsonData.classes[year].subjects[subject][term] &&
        jsonData.classes[year].subjects[subject][term][0].labels[labelIndex] &&
        jsonData.classes[year].subjects[subject][term][0].chartData[
          labelIndex
        ] !== undefined
      ) {
        // Update the chartData at the specific index
        jsonData.classes[year].subjects[subject][term][0].chartData[
          labelIndex
        ] = newChartDataValue;
  
        // Write updated data back to the file
        fs.writeFile(
          `json/${currentYear}/topics.json`,
          JSON.stringify(jsonData, null, 2),
          (err) => {
            if (err) {
              return res.status(500).send("Error writing file");
            }
            res.status(200).send("Chart data index updated successfully");
          }
        );
      } else {
        res
          .status(400)
          .send("Invalid class, subject, term, topic index, or label index");
      }
    });
};

module.exports = updateChartdata;