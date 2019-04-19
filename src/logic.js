.import QtQuick 2.0 as QQ
.import "util.js" as Util;

var xComponent;
var oComponent;

// an array containing strings of the symbols added
var board = new Array(9)
var gameOver;
var turn;
var startingPlayer = -1;
// an array containing the qml objects added (the ticks)
var addedTicks = new Array(9);

// order must follow game consecution (accessed using XSIGN and YSIGN)
const players = ["X", "O"];

const CENTER = 4
const VERTICES = [0, 2, 6, 8]
const SEMIVERTICES = [1, 3, 5, 7]

const SIGN  = {
    XSIGN: 0,
    OSIGN: 1,
    EMPTY: 2
};

function row(index){ return Math.floor(index/3) }
function column(index){ return index%3 }

// returns the position of the possible score of the given player is exists, -1 otherwise
function possibleWin(sign){
    for(var i=0; i<9; i++){
        if(board[i] !== SIGN.EMPTY) continue

        board[i] = sign
        if(checkVictory(sign)){
            board[i] = SIGN.EMPTY
            return i;
        }

        board[i] = SIGN.EMPTY
    }

    return -1;
}

function hasOppositeVertices(sign){
    return board[0] === board[8] && board[0] === sign ||
            board[2] === board[6] && board[2] === sign
}

function hasNearSemivertexes(sign){
    var first, second
    for(var i=0; i<9; i++){
        if(board[i] === sign) { first = i; break; }
    }
    i++;
    for(; i<9; i++){
        if(board[i] === sign) { second = i; break; }
    }

    if(SEMIVERTICES.includes(first) && SEMIVERTICES.includes(second) && first + second != 8) {
        for(var elem in VERTICES){
            var index = VERTICES[elem]
            if(board[index] !== SIGN.EMPTY) continue

            if((column(index) === column(first) || row(index) === row(first)) &&
                    (column(index) === column(second) || row(index) === row(second))){
                return index;
            }
        }
    }

    return -1;
}

// returns the position of the L countermeasure if it is present, -1 otherwise (makes sense only in the second turn)
function hasL(sign){
    // the position of the first of the 2 ticks
    var first;
    for(var i=0; i<6; i++){
        if(board[i] === sign) { first = i; break; }

        if(i === 5) return -1;
    }

    if(first + 5 < 9 && board[first +5] === sign) {
        if(column(first) === 0) return 2 + row(first) * 4;
        else return (column(first) - 1)*8
    }
    else if(first + 7 < 9 && board[first + 7] === sign) return first + 1 + 5 * (1 - column(first));
    else if(first % 3 === 2 && board[first + 1] === sign) return 8 * row(first);

    return -1;
}

function bareAttack(sign){
    if(possibleWin(sign) > -1) return possibleWin(sign)
    for(var i=0; i<9; i++){
        if(board[i] !== SIGN.EMPTY) continue

        board[i] = sign
        if(possibleWin(sign) > 0) {
            board[i] = SIGN.EMPTY
            return i
        }

        board[i] = SIGN.EMPTY
    }

    // no attack is possible
    for(i=0; i<9; i++){
        if(board[i] === SIGN.EMPTY) return i
    }
}

function nextMoveAsSecond(){
    if(board[CENTER] === SIGN.EMPTY){
        return CENTER;
    }
    // if it's the first turn and the center is occupied I'll go for one of the vertex
    else if(turn === 0) return VERTICES[Math.floor(Math.random() * VERTICES.length)];
    else if(possibleWin(SIGN.OSIGN) > 0) return possibleWin(SIGN.OSIGN)
    else if(possibleWin(SIGN.XSIGN) > 0) return possibleWin(SIGN.XSIGN)
    else if(turn === 1 && hasOppositeVertices(SIGN.XSIGN)) return SEMIVERTICES[Math.floor(Math.random() * VERTICES.length)]
    else if(turn === 1 && hasL(SIGN.XSIGN) !== -1) return hasL(SIGN.XSIGN)
    else if(turn === 1 && hasNearSemivertexes(SIGN.XSIGN)) return hasNearSemivertexes(SIGN.XSIGN);
    else return bareAttack(SIGN.OSIGN)
}

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
    startingPlayer++;

    console.log("Match started")
}

function addTick(sign, row, column){
    var tick;
    if(sign === SIGN.XSIGN){
        if((tick=createX(row, column)) === null) return
    }
    else{
        if((tick=createO(row, column)) === null) return
    }

    board[row*3 + column] = sign;
    addedTicks[row*3 + column] = tick
}

// handles the click in a certain cell
function clicked(row, column){
    if(board[row*3 + column] !== SIGN.EMPTY || gameOver) return

    addTick(SIGN.XSIGN, row, column);
    if(checkVictory(SIGN.XSIGN)){
        gameOver = true;

        main.showDialog(players[SIGN.XSIGN])

        return;
    }

    var pos = nextMoveAsSecond();
    if(pos >= 0) addTick(SIGN.OSIGN, Math.floor(pos/3), pos%3);
    else return;

    if(checkVictory(SIGN.OSIGN)){
        gameOver = true;

        main.showDialog(players[SIGN.OSIGN])

        return;
    }

    turn++;
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
