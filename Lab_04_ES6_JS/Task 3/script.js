$(document).ready(function() {
    $("input").on("blur", function() {
        validateInput($(this));
    });

    function validateInput(el) {
        let val = el.val().trim();
        let isInvalid = false;

        if (val === "") {
            isInvalid = true;
        } else if (el.attr("type") === "email") {
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!val.match(emailPattern)) isInvalid = true;
        }

        if (isInvalid) {
            el.addClass("invalid");
            el.siblings(".error-msg").stop().slideDown(200);
            return false;
        } else {
            el.removeClass("invalid");
            el.siblings(".error-msg").stop().slideUp(200);
            return true;
        }
    }

    $("#registrationForm").on("submit", function(e) {
        e.preventDefault(); 
        
        let formValid = true;
        $("input").each(function() {
            if (!validateInput($(this))) formValid = false;
        });

        if (formValid) {
            $(this).fadeOut(400, function() {
                $("#successBox").fadeIn();
            });
        }
    });
});