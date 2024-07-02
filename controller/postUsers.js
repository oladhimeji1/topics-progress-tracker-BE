const fs = require('fs');

const postUsers = async (req, res) => {
  var currentYear = '';
    const d = new Date();
    currentYear = d.getFullYear().toString();

    const newUser = req.body;
    if(!fs.existsSync(`json/${currentYear}`)){
      fs.mkdir(`json/${currentYear}`, err => {
        if(err){
          res.status(404).send('An error occure, please contact the developer for debugging');
        } else {
  
          var users = []
          var updatedJsonData = JSON.stringify(users, null, 2)
          
          fs.writeFile(
            `json/${currentYear}/users.json`,
            JSON.stringify(updatedJsonData, null, 2),
            (err) => {
              if (err) {
                return res.status(500).send("Error writing file");
              }
              res.status(200).send("Topic added successfully");
            }
          );
          res.status(200).send('Welcome to ' + currentYear);
        }
      })
    } else {
      fs.readFile(`json/${currentYear}/users.json`, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return res.status(500).send("Internal server error");
        }
  
        try {
          // Parse the JSON data
          const jsonData = JSON.parse(data);
  
          // Add the new user to the 'users' array
          jsonData.users.push(newUser);
  
          // Convert the modified data back to JSON
          const updatedJsonData = JSON.stringify(jsonData, null, 2);
          // console.log(updatedJsonData);
  
          // Write the updated JSON data back to the file
          fs.writeFile(`json/${currentYear}/users.json`, updatedJsonData, "utf8", (err) => {
            if (err) {
              console.error("Error writing file:", err);
              return res.status(500).send("Internal server error");
            }
            // console.log('New user added successfully.');
            res.status(200).send("New user added successfully");
          });
        } catch (parseError) {
          console.error("Error parsing JSON data:", parseError);
        }
      });
    }
};

module.exports = postUsers;