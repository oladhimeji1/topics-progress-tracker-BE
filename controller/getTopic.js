const fs = require('fs');

const getTopic = (req, res) => {
  var currentYear = '';
  const d = new Date();
  currentYear = d.getFullYear().toString()

    const { year, subject, term } = req.body;
  
    // Read existing data
    fs.readFile(`json/${currentYear}/topics.json`, (err, data) => {
      if (err) {
        return res.status(500).send("Error reading file");
      }
  
      let jsonData = JSON.parse(data);
      
      if (
        jsonData.classes[year] &&
        jsonData.classes[year].subjects[subject] &&
        jsonData.classes[year].subjects[subject][term]
      ) {
        
          const data = jsonData.classes[year].subjects[subject][term][0]
        
          // console.log(JSON.stringify(data));
          res.status(200).send(JSON.stringify(data));
      } else {
        res
          .status(400)
          .send(
            "The class, subject, or term you try to update might not exist. Kindly contact the admin"
          );
      }
    });
};

module.exports = getTopic;