const fs = require('fs');

const login = (req, res) => {
    var currentYear = '';
    const d = new Date();
    currentYear = d.getFullYear().toString()

    const { username, password } = req.body;
  
    // Read existing data
    fs.readFile(`json/${currentYear}/users.json`, (err, data) => {
      if (err) {
        return res.status(500).send("Error reading file");
      }
  
      let jsonData = JSON.parse(data);
  
      const user = jsonData.users.find(user => user.id === username && user.psw === password);
  
      if (user) {
          res.status(200).json(user);
      } else {
          res.status(401).json({ err: 'Invalid username or password' });
      }
  
      
    });
};

module.exports = login;