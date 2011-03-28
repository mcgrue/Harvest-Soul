var $$ = {};

$$.log = function(msg) {
    old = $('#logger').val();

    if( old.length > 10000 ) {
        old = '';
    }

    $('#logger').val( msg + "\n" + old );
};

