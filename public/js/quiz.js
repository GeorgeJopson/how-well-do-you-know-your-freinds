
let type =$("#type").html()
if(type=="initial"){
  $("#answersForm").attr("action","/createLink");
}else{
  $("#answersForm").attr("action","/score");
}

function Question(question,answers){
  if (type=="initial"){
    this.question=question.replaceAll("-","your").replaceAll("$","you");
  }else{
    this.question=question.replaceAll("-","their").replaceAll("$","they");
  }
    this.answers=answers;
}

let questions=[new Question("What is - favourite colour?",["Blue","Red","Green","Yellow"]), new Question("What is - favourite super hero",["Batman","Iron Man","Spiderman","Captain America"]), new Question("What flavour of ice cream do $ hate the most?",["Vanilla","Chocolate","Strawberry","Mint Choc Chip"]), new Question("What job do $ want the most?",["Doctor","Astronaut","Teacher","Author"]), new Question("What job do $ want the least?",["Doctor","Astronaut","Teacher","Author"]),new Question("What is - favourite animal out of:",["Dog","Cat","Turtle","Shark"]),new Question("What is - favourite type of music from:",["Rock","Pop","Rap","Classical"]),new Question("If $ were invisible for one day, what would you do?",["Rob a bank","Spy on people","Prank people","Nothing"]),new Question("In - opinion, what is the most important quality in a friend",["Kind","Good Communicator","Funny","Trust"]),new Question("If $ had a time machine, where would $ go first?",["The future","Victorian London","Ancient Rome","The Jurassic Era"])];
let questionCounter=0;
let answers=[];
function newQuestion(counter){
  let question=questions[counter]
  $("#question").html(question.question);
  for (var i = 0; i < question.answers.length; i++) {
    $("#"+(i+1)).html(question.answers[i])
  }
  questionCounter++;
}
function startQuestions(){
  $("button").click(function(){
    answers.push(this.name);
    if(questionCounter==questions.length){
      console.log(answers);
      $("#answers").attr("value",answers.join(""));
      $("#answersForm").submit();
    }else{
      newQuestion(questionCounter);
    }
  });
  newQuestion(questionCounter);
}
if(type=="initial"){
  $(".nameBox").removeClass("hide");
  $("#nameSubmitButton").click(function(){
    let name=$("#nameInput").val();
    console.log(name)
    $("#name").attr("value",name);
    $(".questionBox").removeClass("hide");
    $(".nameBox").addClass("hide");
    startQuestions();
  });
}else{
  $(".questionBox").removeClass("hide");
  startQuestions();
}
