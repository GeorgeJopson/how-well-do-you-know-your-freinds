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
  let message="Fill out this quiz"
  res.render("home",{message:message,friendsResult:friendsResult,action:action});
});

app.post("/createLink",function(req,res){
  let name= req.body.name;
  let results = req.body.answers;
  results=results.replaceAll("1","<").replaceAll("2",">").replaceAll("3","+").replaceAll("4","~");
  let link = "https://nameless-reef-41699.herokuapp.com//"+name+"/"+results;
  let message="Share this link with your friends!"
  res.render("results",{message:message,output:link});
});

app.get("/:name/:results",function(req,res){
  let friendsName= req.params.name;
  let friendsResult = req.params.results;
  friendsResult=friendsResult.replaceAll("<","1").replaceAll(">","2").replaceAll("+","3").replaceAll("~","4");
  let message ="Guess "+friendsName+"'s answers";
  let action ="score";
  res.render("home",{message:message,friendsResult:friendsResult,action:action});
});

app.post("/score",function(req,res){
  let results = req.body.answers.split("");
  let friendsResult = req.body.friendsResult.split("");
  console.log(req.body.friendsResult);
  let correct=0;
  let outOf=0
  results.forEach(function(answer){
    if (answer==friendsResult[outOf]) {
      correct++;
    }
    outOf++;
  });
  let message ="Your score (how many answers you guessed correctly) is...";
  let score = correct+"/"+outOf;
  let questions = [["What is their favourite colour?",["Blue","Red","Green","Yellow"]], ["What is their favourite super hero",["Batman","Iron Man","Spiderman","Captain America"]], ["What flavour of ice cream do they hate the most?",["Vanilla","Chocolate","Strawberry","Mint Choc Chip"]], ["What job do they want the most?",["Doctor","Astronaut","Teacher","Author"]], ["What job do they want the least?",["Doctor","Astronaut","Teacher","Author"]],["What is their favourite animal out of:",["Dog","Cat","Turtle","Shark"]],["What is - favourite type of music from:",["Rock","Pop","Rap","Classical"]],["If they were invisible for one day, what would you do?",["Rob a bank","Spy on people","Prank people","Nothing"]],["In their opinion, what is the most important quality in a friend",["Kind","Good Communicator","Funny","Trust"]],["If they had a time machine, where would they go first?",["The future","Victorian London","Ancient Rome","The Jurassic Era"]]];
  res.render("results",{message:message,output:score,friendsResult:friendsResult,questions:questions})
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
  console.log("Server started");
});
