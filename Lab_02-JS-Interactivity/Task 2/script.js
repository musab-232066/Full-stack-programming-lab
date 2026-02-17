function calculate(){

    let n1 = parseFloat(document.getElementById("num1").value);
    let n2 = parseFloat(document.getElementById("num2").value);
    let op = document.getElementById("operator").value;
    let resultBox = document.getElementById("resultBox");

    if(isNaN(n1) || isNaN(n2)){
        resultBox.innerText = "Please enter valid numbers";
        resultBox.style.background = "orange";
        return;
    }

    if(op === "/" && n2 === 0){
        resultBox.innerText = "Cannot divide by zero";
        resultBox.style.background = "red";
        return;
    }

    let result;

    if(op === "+") result = n1 + n2;
    else if(op === "-") result = n1 - n2;
    else if(op === "*") result = n1 * n2;
    else result = n1 / n2;

    resultBox.innerText = "Result: " + result;

    if(result > 0)
        resultBox.style.background = "lightgreen";
    else if(result < 0)
        resultBox.style.background = "salmon";
    else
        resultBox.style.background = "lightgray";
}
