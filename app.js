const express = require("express");
const router = require ("./route/route");
var cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.port || 8080;

// Middleware
// express.urlencoded({extended:true})
app.use(express.json());
app.use(cors());

app.use("/", router);


// app.get("/users", (req, res) => {
//   if(!fs.existsSync(`json/${currentYear}`)){
//     fs.mkdir(`json/${currentYear}`, err => {
//       if(err){
//         res.status(404).send('An error occure, please contact the developer for debugging');
//       } else {

//         const data = {
//           users: []
//         };
//         const jsonContent = JSON.stringify(data, null, 2);
//         fs.writeFile(`json/${currentYear}/users.json`, jsonContent, 'utf8', (err) => {
//           if (err) {
//             res.status(404).send('An error occure while trying to write into empty users.json, please contact the developer for debugging: ', err);
//           } else {
//             console.log('JSON file has been saved successfully.');
//           }
//         });
//         res.status(200).send('Welcome to ' + currentYear);
//       }
//     })
//   } else {
//     fs.readFile(`json/${currentYear}/users.json`, { encoding: "utf8" }, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         // console.log(data);
//         res.send(data);
//       }
//     });
//   }
// });

// app.post("/users", (req, res) => {
//   const newUser = req.body;
//   if(!fs.existsSync(`json/${currentYear}`)){
//     fs.mkdir(`json/${currentYear}`, err => {
//       if(err){
//         res.status(404).send('An error occure, please contact the developer for debugging');
//       } else {

//         var users = []
//         var updatedJsonData = JSON.stringify(users, null, 2)
        
//         fs.writeFile(
//           `json/${currentYear}/users.json`,
//           JSON.stringify(updatedJsonData, null, 2),
//           (err) => {
//             if (err) {
//               return res.status(500).send("Error writing file");
//             }
//             res.status(200).send("Topic added successfully");
//           }
//         );
//         res.status(200).send('Welcome to ' + currentYear);
//       }
//     })
//   } else {
//     fs.readFile(`json/${currentYear}/users.json`, "utf8", (err, data) => {
//       if (err) {
//         console.error("Error reading file:", err);
//         return res.status(500).send("Internal server error");
//       }

//       try {
//         // Parse the JSON data
//         const jsonData = JSON.parse(data);

//         // Add the new user to the 'users' array
//         jsonData.users.push(newUser);

//         // Convert the modified data back to JSON
//         const updatedJsonData = JSON.stringify(jsonData, null, 2);
//         // console.log(updatedJsonData);

//         // Write the updated JSON data back to the file
//         fs.writeFile(`json/${currentYear}/users.json`, updatedJsonData, "utf8", (err) => {
//           if (err) {
//             console.error("Error writing file:", err);
//             return res.status(500).send("Internal server error");
//           }
//           // console.log('New user added successfully.');
//           res.status(200).send("New user added successfully");
//         });
//       } catch (parseError) {
//         console.error("Error parsing JSON data:", parseError);
//       }
//     });
//   }
// });

// app.get("/submitted", (req, res) => {
//   if(!fs.existsSync(`json/${currentYear}`)){
//     fs.mkdir(`json/${currentYear}`, err => {
//       if(err){
//         res.status(404).send('An error occure, please contact the developer for debugging');
//       } else {

//         var submittedTopics = []
//         var updatedJsonData = JSON.stringify(submittedTopics, null, 2)
        
//         fs.writeFile(
//           `json/${currentYear}/submitted.json`,
//           JSON.stringify(updatedJsonData, null, 2),
//           (err) => {
//             if (err) {
//               return res.status(500).send("Error writing file");
//             }
//             res.status(200).send("Topic submitted successfully");
//           }
//         );
//         res.status(200).send('Welcome to ' + currentYear);
//       }
//     })
//   } else {
//     fs.readFile(`json/${currentYear}/submitted.json`, { encoding: "utf8" }, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         // console.log(data);
//         res.send(data);
//       }
//     });
//   }
// });

// app.get("/topics", (req, res) => {
//   fs.readFile(`json/${currentYear}/topics.json`, { encoding: "utf8" }, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // console.log(data);
//       res.send(data);
//     }
//   });
// });

// Endpoint to get a single user by ID
// app.get("/getUser/:id", (req, res) => {
//   const userId = req.params.id;

//   // Read the JSON file
//   fs.readFile(`json/${currentYear}/users.json`, "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return res.status(500).send("Internal server error");
//     }

//     try {
//       // Parse the JSON data
//       const jsonData = JSON.parse(data);

//       // Find the user by ID
//       const user = jsonData.users.find((user) => user.id === userId);

//       if (user) {
//         res.status(200).json(user);
//       } else {
//         res.status(404).send("User not found");
//       }
//     } catch (parseError) {
//       console.error("Error parsing JSON data:", parseError);
//       res.status(500).send("Internal server error");
//     }
//   });
// });

// app.post("/update-topics", (req, res) => {
//   const { year, subject, term, newTopic } = req.body;

//   // Read existing data
//   fs.readFile(`json/${currentYear}/topics.json`, (err, data) => {
//     if (err) {
//       return res.status(500).send("Error reading file");
//     }

//     let jsonData = JSON.parse(data);

//     // Add the new topic
//     if (
//       jsonData.classes[year] &&
//       jsonData.classes[year].subjects[subject] &&
//       jsonData.classes[year].subjects[subject][term]
//     ) {
//       jsonData.classes[year].subjects[subject][term].push(newTopic);

//       // Write updated data back to the file
//       fs.writeFile(
//         `json/${currentYear}/topics.json`,
//         JSON.stringify(jsonData, null, 2),
//         (err) => {
//           if (err) {
//             return res.status(500).send("Error writing file");
//           }
//           res.status(200).send("Topic added successfully");
//         }
//       );
//     } else {
//       res
//         .status(400)
//         .send(
//           "The class, subject, or term you try to update might not exist. Kindly contact the admin"
//         );
//     }
//   });
// });

// app.post("/get-topics", (req, res) => {
//   const { year, subject, term } = req.body;

//   // Read existing data
//   fs.readFile(`json/${currentYear}/topics.json`, (err, data) => {
//     if (err) {
//       return res.status(500).send("Error reading file");
//     }

//     let jsonData = JSON.parse(data);
    
//     if (
//       jsonData.classes[year] &&
//       jsonData.classes[year].subjects[subject] &&
//       jsonData.classes[year].subjects[subject][term]
//     ) {
      
//         const data = jsonData.classes[year].subjects[subject][term][0]
      
//         // console.log(JSON.stringify(data));
//         res.status(200).send(JSON.stringify(data));
//     } else {
//       res
//         .status(400)
//         .send(
//           "The class, subject, or term you try to update might not exist. Kindly contact the admin"
//         );
//     }
//   });
// });

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   // Read existing data
//   fs.readFile(`json/${currentYear}/users.json`, (err, data) => {
//     if (err) {
//       return res.status(500).send("Error reading file");
//     }

//     let jsonData = JSON.parse(data);

//     const user = jsonData.users.find(user => user.id === username && user.psw === password);

//     if (user) {
//         res.status(200).json(user);
//     } else {
//         res.status(401).json({ err: 'Invalid username or password' });
//     }

    
//   });
// });

// app.post("/update-chartData-index", (req, res) => {
//   const { year, subject, term, topicIndex, labelIndex, newChartDataValue } =
//     req.body;

//   // Read existing data
//   fs.readFile(`json/${currentYear}/topics.json`, (err, data) => {
//     if (err) {
//       return res.status(500).send("Error reading file");
//     }

//     let jsonData = JSON.parse(data);

//     // Check if the topic and label index exist
//     if (
//       jsonData.classes[year] &&
//       jsonData.classes[year].subjects[subject] &&
//       jsonData.classes[year].subjects[subject][term] &&
//       jsonData.classes[year].subjects[subject][term][0].labels[labelIndex] &&
//       jsonData.classes[year].subjects[subject][term][0].chartData[
//         labelIndex
//       ] !== undefined
//     ) {
//       // Update the chartData at the specific index
//       jsonData.classes[year].subjects[subject][term][0].chartData[
//         labelIndex
//       ] = newChartDataValue;

//       // Write updated data back to the file
//       fs.writeFile(
//         `json/${currentYear}/topics.json`,
//         JSON.stringify(jsonData, null, 2),
//         (err) => {
//           if (err) {
//             return res.status(500).send("Error writing file");
//           }
//           res.status(200).send("Chart data index updated successfully");
//         }
//       );
//     } else {
//       res
//         .status(400)
//         .send("Invalid class, subject, term, topic index, or label index");
//     }
//   });
// });

// app.post("/submit-topic", (req, res) => {
//   const { id, name, topic, year, status, subject, term, newChartDataValue } =
//     req.body;

//   // Read existing data
//   fs.readFile(`json/${currentYear}/submitted.json`, (err, data) => {
//     if (err) {
//       return res.status(500).send("Error reading file");
//     }

//     let jsonData = JSON.parse(data);
//     // console.log(req.body);

//     // Check if the topic and label index exist
//     if (jsonData.submittedTopics) {

//       jsonData.submittedTopics.push(req.body);
  
//       // Write updated data back to the file
//       fs.writeFile(
//         `json/${currentYear}/submitted.json`,
//         JSON.stringify(jsonData, null, 2),
//         (err) => {
//           if (err) {
//             return res.status(500).send("Error writing file");
//           }
//           // res.status(200).send("Topic added successfully");
//         }
//       );
//     } else {
//     // res.status(400).send(
//     //     "The class, subject, or term you try to update might not exist. Kindly contact the admin"
//     //     );
//     }
//   });
// });

// app.post("/update-status", (req, res) => {
//   const { id, name, topic, year, status, subject, term } = req.body;

//   // Read existing data
//   fs.readFile(`json/${currentYear}/submitted.json`, (err, data) => {
//     if (err) {
//       return res.status(500).send("Error reading file");
//     }

//     let jsonData = JSON.parse(data);
//     var user

//     try {
//       user = jsonData.submittedTopics.find(topicx => topicx.id === id && topicx.name === name && topicx.topic === topic && topicx.year === year && topicx.subject === subject && topicx.term === term);

//       user.status = status;

//       // console.log(jsonData)

//       // Write updated data back to the file
//       fs.writeFile(
//         `json/${currentYear}/submitted.json`,
//         JSON.stringify(jsonData, null, 2),
//         (err) => {
//           if (err) {
//             return res.status(500).send("Error writing file");
//           }
//           res.status(200).send("Topic updated successfully");
//         }
//       );
//     } catch (error) {
//       console.error('Error parsing subject:', error);
//     }
    
//   });
// });

// 404

app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

app.listen(port, () => console.log(`App running on port ${port}`));
