const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

String.prototype.replaceAll = function(str1, str2, ignore)
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

app.get("/",function(req,res){
  let friendsResult=null;
  let action="initial";
  res.render("home",{friendsResult:friendsResult,action:action});
});

app.post("/createLink",function(req,res){
  let results = req.body.answers;
  results=results.replaceAll("1","<").replaceAll("2",">").replaceAll("3","#").replaceAll("4","~");
  let link = "localhost:3000/"+results;
  res.render("results",{output:link});
});

app.get("/:results",function(req,res){
  let friendsResult = req.params.results;
  friendsResult=friendsResult.replaceAll("<","1").replaceAll(">","2").replaceAll("#","3").replaceAll("~","4");
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
