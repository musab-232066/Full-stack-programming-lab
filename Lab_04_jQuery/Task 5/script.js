$(document).ready(function() {
    let currentSize = 18; 

    $("#userText").on("input", function() {
        $("#displayBlock").text($(this).val());
    });

    $("#btnIncrease").on("click", function() {
        if (currentSize < 72) currentSize += 2;
        $("#displayBlock").css("font-size", currentSize + "px");
    });

    $("#btnDecrease").on("click", function() {
        if (currentSize > 8) currentSize -= 2;
        $("#displayBlock").css("font-size", currentSize + "px");
    });

    $("#textColor").on("change", function() {
        $("#displayBlock")
            .css("color", $(this).val())
            .hide().fadeIn(200); 
    });

    $("#bgColor").on("change", function() {
        $("#displayBlock").css("background-color", $(this).val());
    });

    $("#toggleBold").on("click", function() {
        $(this).toggleClass("active");
        let weight = $(this).hasClass("active") ? "bold" : "normal";
        
        $("#displayBlock").css("font-weight", weight);
    });

    $("#toggleItalic").on("click", function() {
        $(this).toggleClass("active");
        let style = $(this).hasClass("active") ? "italic" : "normal";
        
        $("#displayBlock").css("font-style", style);
    });

    $("#btnReset").on("click", function() {
        currentSize = 18; 
        const defaultText = "jQuery Chaining is powerful!";

        $("#userText").val(defaultText);
        $("#textColor, #bgColor").val($("#textColor option:first").val());
        $(".toggle-btn").removeClass("active");

        $("#displayBlock")
            .text(defaultText)
            .css("font-size", "18px")
            .css("color", "#000")
            .css("background-color", "transparent")
            .css("font-weight", "normal")
            .css("font-style", "normal")
            .hide().slideDown(400); 
    });
});