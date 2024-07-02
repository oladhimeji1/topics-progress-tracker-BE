const fs = require('fs');

const getUser = (req, res) => {
  var currentYear = '';
  const d = new Date();
  currentYear = d.getFullYear().toString()

    const userId = req.params.id;
  
    // Read the JSON file
    fs.readFile(`json/${currentYear}/users.json`, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).send("Internal server error");
      }
  
      try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);
  
        // Find the user by ID
        const user = jsonData.users.find((user) => user.id === userId);
  
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).send("User not found");
        }
      } catch (parseError) {
        console.error("Error parsing JSON data:", parseError);
        res.status(500).send("Internal server error");
      }
    });
};

module.exports = getUser;