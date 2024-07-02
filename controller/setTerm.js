const fs = require('fs');

const setTerm = (req, res) => {
  var currentYear = '';
    const d = new Date();
    currentYear = d.getFullYear().toString();

    const term = req.body;
    if(!fs.existsSync(`json/${currentYear}`)){
      fs.mkdir(`json/${currentYear}`, err => {
        if(err){
          res.status(404).send('An error occure, please contact the developer for debugging');
        } else {
  
          var term = []
          var updatedJsonData = JSON.stringify(term, null, 2)
          
          fs.writeFile(
            `json/${currentYear}/term.json`,
            JSON.stringify(updatedJsonData, null, 2),
            (err) => {
              if (err) {
                return res.status(500).send("Error writing file");
              }
              res.status(200).send("Term creatd successfully");
            }
          );
          res.status(200).send('Welcome to ' + currentYear);
        }
      })
    } else {
      fs.readFile(`json/${currentYear}/term.json`, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return res.status(500).send("Internal server error");
        }
  
        try {
  
          // Convert the modified data back to JSON
          const updatedJsonData = JSON.stringify(term, null, 2);
  
          // Write the updated JSON data back to the file
          fs.writeFile(`json/${currentYear}/term.json`, updatedJsonData, "utf8", (err) => {
            if (err) {
              console.error("Error writing file:", err);
              return res.status(500).send("Internal server error");
            }
            // console.log('New user added successfully.');
            res.status(200).send({
                msg: "Term updated successfully",
                term: term
            });
          });
        } catch (parseError) {
          console.error("Error parsing JSON data:", parseError);
        }
      });
    }
};

module.exports = setTerm;