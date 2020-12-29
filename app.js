const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  let friendsResult=null;
  let action="initial";
  res.render("home",{friendsResult:friendsResult,action:action});
});

app.post("/createLink",function(req,res){
  let results = req.body.answers;
  console.log(results);
  let link = "localhost:3000/"+results;
  res.render("results",{output:link});
});

app.get("/:results",function(req,res){
  let friendsResult = req.params.results;
  let message ="Guess your freinds answers";
  let action ="score";
  res.render("home",{message:message,friendsResult:friendsResult,action:action});
});

app.post("/score",function(req,res){
  let results = req.body.answers.split("");
  let friendsResult = req.body.friendsResult.split("");
  let correct=0;
  let outOf=0
  results.forEach(function(answer){
    if (answer==friendsResult[outOf]) {
      correct++;
    }
    outOf++;
  });
  let score = correct+"/"+outOf;
  res.render("results",{output:score})
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
  console.log("Server started");
});
