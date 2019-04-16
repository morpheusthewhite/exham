.import QtQuick 2.0 as QQ
.import "util.js" as Util;

var xComponent;
var oComponent;

// an array containing strings of the symbols added
var board = new Array(9)
var gameOver;
var turn;
// an array containing the qml objects added (the ticks)
var addedTicks = new Array(9);

// order must follow game consecution (accessed using XSIGN and YSIGN)
const players = ["X", "O"];

const SIGN  = {
    XSIGN: 0,
    YSIGN: 1,
    EMPTY: 2
};

// starts the match by resetting the board
function startMatch(){
    main.hideDialog();

    console.log("clearing board")

    // destroying objects
    var tickTmp
    for(var i=0; i<9; i++){
        tickTmp = addedTicks[i]
        if (tickTmp != null) {
            tickTmp.destroy()
            addedTicks[i] = null
        }
    }

    //clearing symbols
    for(var i=0; i<9; i++){
        board[i] = SIGN.EMPTY;
    }

    gameOver = false;
    turn = 0;

    console.log("Match started")
}

// handles the click in a certain cell
function clicked(row, column){
    if(board[row*3 + column] !== SIGN.EMPTY || gameOver) return

    var sign = -1;
    var tick;

    if(turn%2 == 0) { if((tick=createX(row, column)) !== null) sign = SIGN.XSIGN}
    else { if((tick=createO(row, column)) !== null) sign = SIGN.YSIGN }

    if (sign != -1) board[row*3 + column] = sign;

    turn++;
    addedTicks[row*3 + column] = tick

    if(checkVictory(sign)){
        gameOver = true;

        main.showDialog(players[sign])
    }
}

// creates an O in the given position
function createO(row, column){
    if (oComponent == null) oComponent = Qt.createComponent("../qml/Otic.qml")

    if (oComponent.status == QQ.Component.Ready){
        var dynamicObject = oComponent.createObject(main,
                                                    {x: Util.getCellX(column/2),
                                                     y: Util.getCellX(row/2)});
        if (dynamicObject == null) {
            console.log("error creating block");
            console.log(oComponent.errorString());
            return null;
        }
        return dynamicObject;
    }
    else{
        console.log("error loading o block component");
        console.log(oComponent.errorString());
        return null;
    }
}

// creates an X in the given position
function createX(row, column){
    if (xComponent == null) xComponent = Qt.createComponent("../qml/Xtic.qml")

    if (xComponent.status === QQ.Component.Ready){
        var dynamicObject = xComponent.createObject(main,
                                                    {x: Util.getCellX(column/2),
                                                     y: Util.getCellX(row/2)});
        if (dynamicObject == null) {
            console.log("error creating block");
            console.log(xComponent.errorString());
            return null;
        }
        return dynamicObject;
    }
    else{
        console.log("error loading x block component");
        console.log(xComponent.errorString());
        return null;
    }
}

// checks if the given sign has scored in the rows
function checkColumns(sign){

    for(var i=0; i<3; i++){
        var victory = true;

        for(var j=0; j<3; j++){
            if(board[i+3*j] !== sign) { victory = false; break; }
        }

        if(victory) return true;
    }

    return false
}

// checks if the given sign has scored in the columns
function checkRows(sign){
    for(var i=0; i<9; i+=3){
        var victory = true;

        for(var j=0; j<3; j++){
            if(board[i+j] !== sign) { victory = false; break; }
        }

        if(victory) return true;
    }

    return false
}

// checks if the given sign has scored in the diagonals
function checkDiagonals(sign){
    if(board[1 + 3*1] !== sign) return false
    else if (board[0] === sign && board[3*2 + 2] === sign) return true
    else if (board[0*3 + 2] === sign && board[3*2 + 0] === sign) return true
    else return false
}

function checkVictory(sign){
    return checkColumns(sign) || checkDiagonals(sign) || checkRows(sign)
}
