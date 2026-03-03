$(document).ready(function() {
    let postLimit = 6;  
    let postStart = 0;  

    function fetchPosts() {
        $("#loadMore").hide();
        $("#loader").show();

        $.ajax({
            url: `https://jsonplaceholder.typicode.com/posts?_start=${postStart}&_limit=${postLimit}`,
            method: 'GET',
            success: function(data) {
                if (data.length > 0) {
                    displayPosts(data);
                    postStart += postLimit; 
                    $("#loader").hide();
                    $("#loadMore").show();
                } else {
                    $("#loader").text("No more posts to load.");
                    $("#loadMore").hide();
                }
            },
            error: function(err) {
                console.error("Error fetching data:", err);
                $("#loader").text("Failed to load posts. Please try again.");
            }
        });
    }

    function displayPosts(posts) {
        posts.forEach(post => {
            const card = `
                <div class="post-card">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `;
            $("#postsContainer").append(card);
        });
    }

    $("#loadMore").on("click", function() {
        fetchPosts();
    });

    fetchPosts();
});