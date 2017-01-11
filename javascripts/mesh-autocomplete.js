$( function() {
    $( "#mesh-terms" ).autocomplete({
        source: "/auto_complete",
        appendTo: $("#mesh-terms")
    });
});