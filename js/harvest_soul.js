var $$ = {};

$$.log = function(msg) {
    old = $('#logger').val();

    if( old.length > 10000 ) {
        old = '';
    }

    $('#logger').val( msg + "\n" + old );
};

$$.Items = {
    makeDraggable : function(sel) {
        $( sel ).draggable({ 
            snap: ".slot", 
            snapMode: "inner",
            revert: true,
            helper: "clone",
            opacity: 0.7,
            stack: ".item" 
        });
    }
}


