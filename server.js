// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
//As after express ver 4 body-parser is deprecated and included in express packages instead
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors =require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
// set port to listen through
app.listen(3000, function() {
  console.log("Server running on port 3000");
});



//GET and POST routes
app.get("/weatherData", function(req,res){
  res.send(projectData);
});

app.post("/addData", function(req,res){
const temp=req.body.temp;
const date=req.body.date;
const content=req.body.content;

newData={
  temp: temp,
  date: date,
  content: content
};
projectData=newData;
res.send(projectData);
console.log(projectData);

});
