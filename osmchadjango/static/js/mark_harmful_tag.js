$(function() {
    $('#harmfulTagsSelect').on('change', function(e) {
        console.log('changed');
        var tagName = $(this).val();
        var changesetId = CHANGESET_ID;
        var description = $(this).find('option:selected').text();
        $.post("/set_harmful_tag", {
            'tag_name': tagName,
            'changeset': changesetId
        }, function(response) {
            $('#harmfulTagLabels').append(
                $('<span />')
                    .addClass('label label-warning removeReason')
                    .attr('data-name', tagName)
                    .text(description)
            );
        }, 'json').fail(function(err) {
            alert('failed to add tag');
        });
    });

    $('#harmfulTagLabels').on('click', '.removeReason', function(e) {
        if (confirm('Remove tag?')) {
            var $target = $(e.target);
            var tagName = $target.attr('data-name');
            $.post("/remove_harmful_tag", {
                'tag_name': tagName,
                'changeset': CHANGESET_ID
            }, function(response) {
                $target.remove();
            });
        }
    });
});