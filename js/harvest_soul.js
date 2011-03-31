var $$ = {};

$$.log = function(msg) {
    old = $('#logger').val();

    if( old.length > 10000 ) {
        old = '';
    }

    $('#logger').val( msg + "\n" + old );
};

$$.dragCounter = {
    _ar : [];
    push : function() {
        var d = new Date();
        _ar.push(d.getTime()); 
    },
}

$$.Items = {
    makeDraggable : function(sel) {
        return $( sel ).draggable({ 
            snap: ".slot", 
            snapMode: "inner",
            revert: true,
            helper: "clone",
            opacity: 0.7,
            stack: ".item", 

            drag: function() {
                counts[1]++;
                updateCounterStatus( $drag_counter, counts[ 1 ] );
            }
        });
    }
}

/*
*/

$$.Slots = {
    makeDroppable : function(sel) {
        return $(sel).droppable({
            drop: function( event, ui ) {
                var slot = $(event.target);
                var kids = slot.children();

                if( kids.length ) {
                    var socketed = $(kids[0]);
                    var newItem = $$.canMix(socketed, ui.draggable);
                    if( newItem ) {
                        socketed.remove();
                        $( ui.draggable ).draggable( "option", "revert", false );
                        ui.draggable.remove();
                        var node = $(slot).append('<div class="item '+newItem+'"></div>');
                        $$.Items.makeDraggable( $(node.children()[0]) );
                        return;
                    } else {
                        return false;
                    }
                }

                $( ui.draggable ).draggable( "option", "revert", false );
                var node = ui.draggable.detach();

                node.css( {'left':0, 'top':0} );
                node.appendTo(slot);

                $$.log( 'Item dropped into slot.' );
                setTimeout( function() {
                    $( ui.draggable ).draggable( "option", "revert", true );
                }, 10);
            }
        });
    }
}
