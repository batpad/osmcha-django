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
                    .addClass('label label-default')
                    .text(description)
            );
        }, 'json').fail(function(err) {
            alert('failed to add tag');
        });
    });
});