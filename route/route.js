const express = require ("express");
const router = express.Router();

const getUsers = require("../controller/getUsers");
const postUsers = require("../controller/postUsers");
const submitted = require("../controller/submitted");
const getAllTopics = require("../controller/topics");
const getUser = require("../controller/getUser");
const updateTopic = require("../controller/updateTopics");
const getTopic = require("../controller/getTopic");
const login = require("../controller/login");
const updateChartdata = require("../controller/updateChartdata");
const submitTopic = require("../controller/submitTopic");
const updateStatus = require("../controller/updateStatus");
const setTerm = require("../controller/setTerm");
const getTerm = require("../controller/getTerm");

//Get request routes
router.get("/users", getUsers);
router.get("/submitted", submitted);
router.get("/topics", getAllTopics);
router.get("/getUser/:id", getUser);
router.get("/get-term", getTerm);

// Post request routes
router.post("/users", postUsers);
router.post("/update-topics", updateTopic);
router.post("/get-topics", getTopic);
router.post("/login", login);
router.post("/update-chartData-index", updateChartdata);
router.post("/submit-topic", submitTopic);
router.post("/update-status", updateStatus);
router.post("/set-term", setTerm);

module.exports = router;