const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  let message="Hello!"
  res.render("home",{message:message});
});

app.post("/createLink",function(req,res){
  console.log(req.body.biscuits+req.body.colour+req.body.food)
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
  console.log("Server started")
});
