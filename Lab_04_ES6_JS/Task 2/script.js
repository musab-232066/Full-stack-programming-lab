$(document).ready(function() {
    const images = [
        { url: "images/img1.jpg", title: "Forest View" },
        { url: "images/img2.jpg", title: "Office Essentials" },
        { url: "images/img3.jpg", title: "Mountain Peak" },
        { url: "images/img4.jpg", title: "Computer Code" }
    ];

    let currentIndex = 0;

    function updateGallery(index) {
        $("#galleryImg").fadeOut(400, function() {
            $(this).attr("src", images[index].url).fadeIn(400);
        });

        $("#caption").fadeOut(400, function() {
            $(this).text(images[index].title).fadeIn(400);
        });
    }

    $("#nextBtn").on("click", function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery(currentIndex);
    });

    $("#prevBtn").on("click", function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery(currentIndex);
    });
});