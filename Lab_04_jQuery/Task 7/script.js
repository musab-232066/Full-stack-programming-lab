$(document).ready(function() {
    const $list = $('#sortableList');

    $list.on('dragstart', '.list-item', function(e) {
        $(this).addClass('dragging');
    });

    $list.on('dragend', '.list-item', function() {
        $(this).removeClass('dragging');
        
        $('#orderStatus').fadeIn().delay(1000).fadeOut();
    });

    $list.on('dragover', function(e) {
        e.preventDefault(); 
        
        const draggingItem = document.querySelector('.dragging');
        const siblings = [...$list.find('.list-item:not(.dragging)')];
        
        let nextSibling = siblings.find(sibling => {
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
        });

        if (nextSibling) {
            $list[0].insertBefore(draggingItem, nextSibling);
        } else {
            $list[0].appendChild(draggingItem);
        }
    });
});