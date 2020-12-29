let type =$("#type").html()
if(type=="initial"){
  $("#answersForm").attr("action","/createLink");
}else{
  $("#answersForm").attr("action","/score");
}

function Question(question,answers){
  if (type=="initial"){
    this.question=question.replace("-","your");
  }else{
    this.question=question.replace("-","their");
  }
    this.answers=answers;
}
let questions=[new Question("What is - favourite colour?",["Red","Blue","Green","Yellow"]), new Question("What is - favourite super hero",["Batman","Iron Man","Spiderman","Captain America"]), new Question("What is - most hated ice cream flavour",["Vanilla","Chocolate","Strawberry","Mint Choc Chip"])];
let questionCounter=0;
function newQuestion(counter){
  let question=questions[counter]
  $("#question").html(question.question);
  for (var i = 0; i < question.answers.length; i++) {
    $("#"+(i+1)).html(question.answers[i])
  }
  questionCounter++;
}
let answers=[];
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
