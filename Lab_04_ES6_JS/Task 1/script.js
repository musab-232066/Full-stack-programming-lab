$(document).ready(function() {
    
    // 1. Adding items to the list [cite: 78]
    $("#addBtn").on("click", function() {
        let val = $("#itemInput").val();
        
        if (val.trim() !== "") {
            // Create the list item with a delete button [cite: 15, 78]
            let listItem = `<li>
                                <span>${val}</span>
                                <button class="delete-btn">Delete</button>
                            </li>`;
            
            $("#itemList").append(listItem);
            $("#itemInput").val(""); // Clear input after adding
        } else {
            alert("Please enter a valid item!");
        }
    });

    // 2. Removing items using Event Delegation [cite: 31, 78]
    // We attach the listener to the parent (#itemList) because buttons are added dynamically
    $("#itemList").on("click", ".delete-btn", function() {
        $(this).parent().remove();
    });

    // 3. Highlight on hover using CSS Manipulation 
    $("#itemList").on("mouseenter", "li", function() {
        $(this).addClass("highlight");
    }).on("mouseleave", "li", function() {
        $(this).removeClass("highlight");
    });

});