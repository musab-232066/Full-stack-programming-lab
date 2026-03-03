$(document).ready(function() {

    $(".tab-link").on("click", function() {
        // 1. Manage Active States
        $(".tab-link").removeClass("active");
        $(this).addClass("active");

        let targetId = $(this).data("target");

        // 2. Tab Switching with Animation
        $(".tab-content").fadeOut(300).removeClass("active-content");
        
        $(targetId).delay(300).fadeIn(600).addClass("active-content");

        // 3. Smooth Scroll to Section
        $('html, body').stop().animate({
            scrollTop: $(targetId).offset().top - 100 
        }, 800);
    });

});