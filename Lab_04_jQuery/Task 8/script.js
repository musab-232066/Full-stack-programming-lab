$(document).ready(function() {

        const quizData = [
        {
            question: "What does the 'j' in jQuery stand for?",
            options: ["Java", "JavaScript", "JSON", "Jumbo"],
            correctAnswer: 1
        },
        {
            question: "Which jQuery method is used to hide selected elements?",
            options: [".hidden()", ".invisible()", ".hide()", ".displayNone()"],
            correctAnswer: 2
        },
        {
            question: "What character is used as a shortcut for jQuery?",
            options: ["#", "$", "@", "&"],
            correctAnswer: 1
        },
        {
            question: "Which method allows you to execute multiple CSS properties at once?",
            options: [".css()", ".style()", ".animate()", ".chain()"],
            correctAnswer: 0
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOptionIndex = null;

    loadQuestion();

    function loadQuestion() {
        selectedOptionIndex = null;
        $("#btnNext").prop("disabled", true);
        
        const currentData = quizData[currentQuestionIndex];

        $("#questionCount").text(`Question ${currentQuestionIndex + 1} of ${quizData.length}`);
        $("#questionText").text(currentData.question);
        $("#optionsContainer").empty();

        $.each(currentData.options, function(index, optionText) {
            const optionElement = $(`<div class="option" data-index="${index}">${optionText}</div>`);
            $("#optionsContainer").append(optionElement);
        });
    }

    $("#optionsContainer").on("click", ".option", function() {
        $(".option").removeClass("selected");
        $(this).addClass("selected");
        
        selectedOptionIndex = $(this).data("index");
        
        $("#btnNext").prop("disabled", false);
    });

    $("#btnNext").on("click", function() {
        if (selectedOptionIndex === quizData[currentQuestionIndex].correctAnswer) {
            score++;
        }

        currentQuestionIndex++;

        $("#quizContainer").fadeOut(300, function() {
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
                $("#quizContainer").fadeIn(300);
            } else {
                showResults();
            }
        });
    });

    function showResults() {
        $("#scoreText").text(`${score}/${quizData.length}`);
        
        let feedback = score === quizData.length ? "Perfect Score!" : "Good effort!";
        $("#feedbackText").text(feedback);

        $("#resultContainer").fadeIn(500);
        
        $(".score-circle").animate({ top: "-20px" }, 200).animate({ top: "0px" }, 200);
    }

    $("#btnRestart").on("click", function() {
        currentQuestionIndex = 0;
        score = 0;
        
        $("#resultContainer").fadeOut(300, function() {
            loadQuestion();
            $("#quizContainer").fadeIn(300);
        });
    });

});