$(document).ready(function() {
    
    $("#addBtn").on("click", function() {
        let val = $("#itemInput").val();
        
        if (val.trim() !== "") {
            let listItem = `<li>
                                <span>${val}</span>
                                <button class="delete-btn">Delete</button>
                            </li>`;
            
            $("#itemList").append(listItem);
            $("#itemInput").val(""); 
        } else {
            alert("Please enter a valid item!");
        }
    });

    $("#itemList").on("click", ".delete-btn", function() {
        $(this).parent().remove();
    });

    $("#itemList").on("mouseenter", "li", function() {
        $(this).addClass("highlight");
    }).on("mouseleave", "li", function() {
        $(this).removeClass("highlight");
    });

});