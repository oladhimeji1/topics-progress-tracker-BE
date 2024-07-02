const fs = require('fs');

const getUsers = async (req, res) => {
  var currentYear = '';
  const d = new Date();
  currentYear = d.getFullYear().toString()
  
    if(!fs.existsSync(`json/${currentYear}`)){
      fs.mkdir(`json/${currentYear}`, err => {
        if(err){
          res.status(404).send('An error occure, please contact the developer for debugging');
        } else {
  
          const data = {
            users: []
          };
          const jsonContent = JSON.stringify(data, null, 2);
          fs.writeFile(`json/${currentYear}/users.json`, jsonContent, 'utf8', (err) => {
            if (err) {
              res.status(404).send('An error occure while trying to write into empty users.json, please contact the developer for debugging: ', err);
            } else {
              console.log('JSON file has been saved successfully.');
            }
          });
          res.status(200).send('Welcome to ' + currentYear);
        }
      })
    } else {
      fs.readFile(`json/${currentYear}/users.json`, { encoding: "utf8" }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(data);
          res.send(data);
        }
      });
    }
};

module.exports = getUsers;