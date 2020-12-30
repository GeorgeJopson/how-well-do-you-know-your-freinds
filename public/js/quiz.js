let type =$("#type").html()
if(type=="initial"){
  $("#answersForm").attr("action","/createLink");
}else{
  $("#answersForm").attr("action","/score");
}

function Question(question,answers){
  if (type=="initial"){
    this.question=question.replace("-","your").replace("$","you");
  }else{
    this.question=question.replace("-","their").replace("$","they");
  }
    this.answers=answers;
}

let questions=[new Question("What is - favourite colour?",["Blue","Red","Green","Yellow"]), new Question("What is - favourite super hero",["Batman","Iron Man","Spiderman","Captain America"]), new Question("What flavour of ice cream do $ hate the most?",["Vanilla","Chocolate","Strawberry","Mint Choc Chip"])];
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
  $(".questionBox").hide();
  $("#nameSubmitButton").click(function(){
    let name=$("#nameInput").val();
    console.log(name)
    $("#name").attr("value",name);
    $(".questionBox").show();
    $(".nameBox").hide();
    startQuestions();
  });
}else{
  $(".nameBox").hide();
  startQuestions();
}
