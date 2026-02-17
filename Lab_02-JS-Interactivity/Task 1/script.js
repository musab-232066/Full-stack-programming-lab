// Questions
const q1 = "1) Which symbol is used to end a statement in many programming languages (like C, Java)?";
const q2 = "2) What does HTML stand for?";
const q3 = "3) Which data type stores true or false values?";
const q4 = "4) Which loop runs at least once even if condition is false?";

// Answers
const a1 = ";";
const a2 = "hypertext markup language";
const a3 = "boolean";
const a4 = "do while";

// Load questions dynamically using DOM
document.getElementById("q1text").innerText = q1;
document.getElementById("q2text").innerText = q2;
document.getElementById("q3text").innerText = q3;
document.getElementById("q4text").innerText = q4;


// functions to check answers
function checkQ1(){
    return document.getElementById("q1").value.toLowerCase().trim() === a1 ? 1 : 0;
}

function checkQ2(){
    return document.getElementById("q2").value.toLowerCase().trim() === a2 ? 1 : 0;
}

function checkQ3(){
    return document.getElementById("q3").value.toLowerCase().trim() === a3 ? 1 : 0;
}

function checkQ4(){
    return document.getElementById("q4").value.toLowerCase().trim() === a4 ? 1 : 0;
}

function checkQuiz(){

    let score = 0;

    score += checkQ1();
    score += checkQ2();
    score += checkQ3();
    score += checkQ4();

    document.getElementById("result").innerText =
        "Your Score: " + score + " / 4";

    if(score == 4)
        document.getElementById("message").innerText = "Excellent!";
    else if(score >= 2)
        document.getElementById("message").innerText = "Good Job!";
    else
        document.getElementById("message").innerText = "Try Again!";
}

function resetQuiz(){
    document.getElementById("q1").value="";
    document.getElementById("q2").value="";
    document.getElementById("q3").value="";
    document.getElementById("q4").value="";
    document.getElementById("result").innerText="";
    document.getElementById("message").innerText="";
}
