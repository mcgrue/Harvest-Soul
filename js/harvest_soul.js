var $$ = {};

$$.log = function(msg) {
    old = $('#logger').val();

    if( old.length > 500 ) {
        old = '';
    }

    $('#logger').val( msg + "\n" + old );
};

$$.dragCounter = {
    
    dragStack : [],

    reset : function() {
        $$.dragStack = [];
        $$.log( 'reset drag counter.' );
    },

    recordDrag : function(x,y) {
        var d = new Date();
        this.dragStack.push([d.getTime(), x, y]); 
    }, 

    shakeCalc : function() {
        var d = new Date();

        var hit = false;

        var max_check = 1250;
        var shake_check = 1000;
        var direction_change_threshhold = 7;

        var i = 0;
        while( this.dragStack.length > 0 && this.dragStack[0][0] < d.getTime() - max_check ) {
            this.dragStack.pop();
            i++;
        }

        if( i ) {
            $$.log( 'shakecalc: cleaned ' + i );
        }        

        var direction_changes = 0;
        var last_x = 0;
        var last_dir = 0;

        for( var i = 0; i<this.dragStack.length; i++ ) {
            var cur = this.dragStack[i];
    

            if( i == 0 ) {
                last_x = cur[1];
            } else if( i == 1 ) {
                last_dir = cur[1] - last_x;
                last_x = cur[1];
            } else {
                var prev_dir = last_dir;
                last_dir = cur[1] - last_x;
                last_x = cur[1];

                if( prev_dir < 0 && last_dir > 0 ) {
                    direction_changes++;        
                } else if( prev_dir > 0 && last_dir < 0 ) {
                    direction_changes++;
                }
            }

            if( direction_changes >= direction_change_threshhold ) {
                hit = true;
                break;       
            }
        }

        if( hit ) {
            $$.log( 'SHAKE!!!!!!!!!!!' );
        }

        if(this.dragStack.length) {
            $$.log('shakecalc mofo! ' + this.dragStack[this.dragStack.length-1][0]);  
        }
    }
}

$$.Items = {
    makeDraggable : function(sel) {
        return $( sel ).draggable({ 
            snap: ".slot", 
            snapMode: "inner",
            revert: true,
            //helper: "clone",
            opacity: 1.0,
            stack: ".item", 

            drag: function() {
                var pos = $(this).position();
                $$.log( 'drag: ' + pos.left + ', '+pos.top );
                $$.dragCounter.recordDrag( pos.left, pos.top );
                $$.dragCounter.shakeCalc();
            },
            start: function() {
                $$.dragCounter.reset();
            },
            stop: function() {
                $$.dragCounter.reset();
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
    },

    makeSpecial : function( slot, classname, fn ) {

        slot = $(slot);
        slot.addClass(classname);
        
        var orig_fn = slot.droppable("option", "drop");

        /// probably breaking closures, find a bind you like, mofo.
        slot.droppable("option", "drop",
            function(event, ui) {
                if( fn(event, ui) !== false ) {
                    orig_fn(event, ui);
                }
            }
        );
    }
}


