$$.mixchart = {
    red : {
        green : 'brown'
    },

    green : {
        red : 'yellow'
    },

    cat : {
        scissors : 'skull'
    },

    scissors : {
        cat : 'scissors'
    },

    water : {
        gypsum_dust : 'gypsum_solution'    
    },

    gypsum_dust : {
        water : 'gypsum_solution'
    }
};

$$.shakeChart = {
    cat : 'skull',
    gypsum_solution : 'mixed_plaster'
};

$$.burnChart = {
    paper : 'ashe'
};

$$.pickaxeChart = {
    rock : 'gypsum'
};


$$.pestleChart = {
    gypsum : 'gypsum_dust'
};

$$.isItem = function( elem ) {
    return !(elem.attr('class').split(' ')[0] != 'item' || !elem.attr('class').split(' ')[1]);
}

$$.canShake = function( dragged ) {
    if( !$$.isItem(dragged) ) {
        debugger;
        throw "invalid: was passed in something that was not an item.";
    } 
    
    var a = dragged.attr('class').split(' ')[1];

    if( $$.shakeChart[a] ) {
        return $$.shakeChart[a];
    }
};

$$.canBurn = function( dragged ) {
    if( !$$.isItem(dragged) ) {
        debugger;
        throw "invalid: was passed in something that was not an item.";
    } 
    
    var a = dragged.attr('class').split(' ')[1];

    if( $$.burnChart[a] ) {
        return $$.burnChart[a];
    }
};

$$.canPestle = function( dragged ) {
    if( !$$.isItem(dragged) ) {
        debugger;
        throw "invalid: was passed in something that was not an item.";
    } 
    
    var a = dragged.attr('class').split(' ')[1];

    if( $$.pestleChart[a] ) {
        return $$.pestleChart[a];
    }
};

$$.canPickaxe = function( dragged ) {
    if( !$$.isItem(dragged) ) {
        debugger;
        throw "invalid: was passed in something that was not an item.";
    } 
    
    var a = dragged.attr('class').split(' ')[1];

    if( $$.pickaxeChart[a] ) {
        return $$.pickaxeChart[a];
    }
};

$$.canMix = function( slotted, dragged ) {
    var a = slotted;
    var b = dragged;

    if(
           !$$.isItem(a) 
        || !$$.isItem(b) 
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
