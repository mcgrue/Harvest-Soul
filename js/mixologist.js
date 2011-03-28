$$.mixchart = {
    red : {
        green : 'brown'
    },

    green : {
        red : 'yellow'
    }
};

$$.canMix = function( slotted, dragged ) {
    var a = slotted;
    var b = dragged;

    if(    a.attr('class').split(' ')[0] != 'item'
        || b.attr('class').split(' ')[0] != 'item'
        || !a.attr('class').split(' ')[1]
        || !b.attr('class').split(' ')[1]
    ) {
        debugger;
        throw "invalid: was passed in something that was not an item.";
    }

    a = a.attr('class').split(' ')[1];
    b = b.attr('class').split(' ')[1];


    if( $$.mixchart[a] && $$.mixchart[a][b] ) {
        return $$.mixchart[a][b];
    }

    if( $$.mixchart[b] && $$.mixchart[b][a] ) {
        return $$.mixchart[b][a];
    }

    return false;
}
