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
