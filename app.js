




require('dotenv').config();
const express = require("express");

const request = require("request");

const bodyParser = require("body-parser");

const https = require("https");





var app = express();

app.use(express.static("public"));

//standard call for body-bodyParser

app.use(bodyParser.urlencoded({extended: true}));



// get and post of the home route "/"

app.get("/",function(req, res){



res.sendFile(__dirname + "/signup.html");



});



app.post("/", function(req, res) {



const fName = req.body.fName;

const lName = req.body.lName;

const email = req.body.email;



const data = {

members: [

{

email_address: email,

status: "subscribed",

merge_fields: {

FNAME: fName,

LNAME: lName

}



}

]

};



const jsonData = JSON.stringify(data);

const url = process.env.URL;

const options = {
method: "POST",
auth: process.env.AUTH

}


const request = https.request(url, options,function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html")
  } else {
    res.sendFile(__dirname+"/failure.html")
  }

response.on("data", function(data){

console.log(JSON.parse(data));

});

});



request.write(jsonData);

request.end();



});

app.post("/failure.html", function(req, res) {
  res.redirect("/")
});


// listen on localhost:3000

//dynamic port for Heroku to deploy on the go, + port 3000 for our local system

app.listen(process.env.PORT || 3000);
