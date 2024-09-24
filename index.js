const questions=[
    {
        question:"which is largest animal in the world?",
        answers:[
            {text:"shark",correct:false},
            {text:"whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Gyraff",correct:false},
        ]
    }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;


function startQuiz()
{
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion()
{
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo +". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
         const button=document.createElement("button");
         button.innerHTML=answer.text;
         button.classList.add("btn");
         answerButtons.appendChild(button);
         if(answer.correct)
         {
            button.dataset.correct=answer.correct;
         }
         button.addEventListener("click",selectAnswer);
    });

}
function resetState()
{
    nextButton.style.display="none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e)
{
    const selectedButton=e.target;
    const isCorrect=selectedButton.dataset.correct=="true";
    if(isCorrect)
    {
        selectedButton.classList.add("correct");
        score++;
    }
    else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>
    {
        if(button.dataset.correct==="true")
        {
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore()
{
    resetState();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length)
    {
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();