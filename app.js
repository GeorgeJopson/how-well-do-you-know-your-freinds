const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  let message="Hello!";
  let freindsResult=null;
  let action="createLink";
  res.render("home",{message:message,freindsResult:freindsResult,action:action});
});

app.post("/createLink",function(req,res){
  let results = req.body.biscuits+req.body.colour+req.body.food;
  let link = "localhost:3000/"+results;
  res.render("results",{output:link});
});

app.get("/:results",function(req,res){
  let freindsResult = req.params.results;
  let message ="Guess your freinds answers";
  let action ="score";
  res.render("home",{message:message,freindsResult:freindsResult,action:action});
});

app.post("/score",function(req,res){
  let results = (req.body.biscuits+req.body.colour+req.body.food).split("");
  let freindsResult = req.body.freindsResult.split("");
  console.log(results);
  console.log(freindsResult);
  let correct=0;
  let outOf=0
  results.forEach(function(answer){
    if (answer==freindsResult[outOf]) {
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
