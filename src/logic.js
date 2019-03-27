.import QtQuick 2.0 as QQ
.import "util.js" as Util;

var xComponent;
var oComponent;
var board;

const SIGN  = {
    XSIGN: 0,
    YSIGN: 1,
    EMPTY: 2
};

function startMatch(){
    board = new Array(9)

    for(var i=0; i<9; i++){
        board[i] = SIGN.EMPTY;
    }

    console.log("Match started")
}

function clicked(row, column){
    if(board[row*3 + column] !== SIGN.EMPTY) return

    var sign = -1;
    if(main.turn%2 == 0) { if(createX(row, column) !== null) sign = SIGN.XSIGN}
    else { if(createO(row, column) !== null) sign = SIGN.YSIGN }

    if (sign != -1) board[row*3 + column] = sign;
    main.turn++;

    checkVictory(sign);
}

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


function checkRow(sign){

    for(var i=0; i<9; i+=3){
        var victory = true;

        for(var j=0; j<3; j++){
            if(board[i+j] !== sign) { victory = false; break; }
        }

        if(victory) return true;
    }

    return false
}

function checkVictory(sign){
    console.log(checkRow(sign))
}
