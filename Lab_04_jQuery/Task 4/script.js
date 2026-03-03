$(document).ready(function() {

    $(".tab-link").on("click", function() {
        $(".tab-link").removeClass("active");
        $(this).addClass("active");

        let targetId = $(this).data("target");

        $(".tab-content").fadeOut(300).removeClass("active-content");
        
        $(targetId).delay(300).fadeIn(600).addClass("active-content");

        $('html, body').stop().animate({
            scrollTop: $(targetId).offset().top - 100 
        }, 800);
    });

});