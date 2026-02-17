function completeTask(num){

    let task = document.getElementById("task"+num);

    task.classList.toggle("completed");

    applyStyleToAll();
}

function removeTask(num){

    let task = document.getElementById("task"+num);
    task.parentElement.style.display = "none";
}


// using loop for styling
function applyStyleToAll(){

    let tasks = document.querySelectorAll("input[type='text']");

    for(let i=0;i<tasks.length;i++){

        if(tasks[i].classList.contains("completed"))
            tasks[i].style.background = "#e0ffe0";
        else
            tasks[i].style.background = "white";
    }
}
