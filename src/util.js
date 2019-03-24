function getCellX(column){
    return column*(main.cellHeight + main.sepSpace) + main.borderSpace
}

function getCellY(row){
    return row*(main.cellHeight + main.sepSpace) + main.borderSpace
}

function getLineX(column, isHorizontal){
    if(isHorizontal) return main.borderSpace
    else return column*(main.sepSpace + main.cellWidth) + main.sepSpace/2
}

function getLineY(row, isHorizontal){
    if(!isHorizontal) return main.borderSpace
    else return row*(main.sepSpace + main.cellHeight) + main.sepSpace/2
}

var xComponent;
var oComponent;
var board = new Array(9)

function clicked(row, column){
    var sign;
    if(main.turn%2 == 0) { sign = createX(row, column); }
    else { sign = createO(row, column); }

    if (sign != null) board[row*3 + column] = sign;
    main.turn++;
    console.log(main.turn)
}

function createO(row, column){
    if (oComponent == null) oComponent = Qt.createComponent("../qml/Otic.qml")

    if (oComponent.status == Component.Ready){
        var dynamicObject = oComponent.createObject(main,
                                                    {x: getCellX(column/2),
                                                     y: getCellX(row/2)});
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

    if (xComponent.status == Component.Ready){
        var dynamicObject = xComponent.createObject(main,
                                                    {x: getCellX(column/2),
                                                     y: getCellX(row/2)});
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
