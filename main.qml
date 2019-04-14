import QtQuick 2.6
import QtQuick.Window 2.2
import QtQuick.Controls 1.0
import QtQuick.Shapes 1.12
import QtQuick.Dialogs 1.3

import "qml"
import "src/util.js" as Util
import "src/logic.js" as Logic

ApplicationWindow {
    id: main

    // centers the window in the screen
    Component.onCompleted: {
        setX(Screen.width / 2 - width / 2);
        setY(Screen.height / 2 - height / 2);
        Logic.startMatch()
    }

    width: boardWidth
    maximumWidth: width
    minimumWidth: width

    height: boardHeight + bottomBoxHeight
    maximumHeight: height
    minimumHeight: height
    visible: true

    color: systemP.window

    // board properties
    property int boardHeight: 300
    property int boardWidth: 300

    property int borderSpace: 10
    property int sepSpace: 10
    property int cellWidth: (boardWidth - borderSpace*2 - sepSpace*2)/3
    property int cellHeight: (boardHeight - borderSpace*2 - sepSpace*2)/3
    property int padding: 4

    property int lineWidth: sepSpace - 2*padding
    property int lineLengthH: boardWidth - 2*borderSpace
    property int lineLengthV: boardHeight - 2*borderSpace

    // these are the dimensions of the box containing the signs (X or O)
    property int boxHeight: cellHeight - 3*padding
    property int boxWidth: cellWidth - 3*padding

    // bottom buttons properties
    property int bottomBoxHeight: 50

    signal clickedCell(int row, int column)
    onClickedCell: Logic.clicked(row, column)

    SystemPalette { id: systemP; colorGroup: SystemPalette.Active}

    Repeater{
        model: 9

        Cell { height: main.cellHeight; width: main.cellWidth
            column: index%3; row: Math.floor(index/3);
            onClicked: clickedCell(row, column)
        }
    }

    Shape{
        ShapePath {
            strokeColor: systemP.mid
            strokeWidth: lineWidth
            capStyle: ShapePath.RoundCap

            startX: Util.getLineX(1, true)
            startY: Util.getLineY(1, true)

            PathLine{
                relativeX: lineLengthH
                relativeY: 0
            }
        }

        ShapePath {
            strokeColor: systemP.mid
            strokeWidth: lineWidth
            capStyle: ShapePath.RoundCap

            startX: Util.getLineX(1, true)
            startY: Util.getLineY(2, true)

            PathLine{
                relativeX: lineLengthH
                relativeY: 0
            }
        }

        ShapePath {
            strokeColor: systemP.mid
            strokeWidth: lineWidth
            capStyle: ShapePath.RoundCap

            startX: Util.getLineX(1, false)
            startY: Util.getLineY(1, false)

            PathLine{
                relativeX: 0
                relativeY: lineLengthV
            }
        }

        ShapePath {
            strokeColor: systemP.mid
            strokeWidth: lineWidth
            capStyle: ShapePath.RoundCap

            startX: Util.getLineX(2, false)
            startY: Util.getLineY(1, false)

            PathLine{
                relativeX: 0
                relativeY: lineLengthV
            }
        }
    }

    ButtonsBox{
        anchors.bottom: parent.bottom
        height: bottomBoxHeight
        width: parent.width

        onMatchStart: Logic.startMatch()
    }

    function showDialog(winner) {
        dialogWindow.show(winner)
    }

    function hideDialog(){
        dialogWindow.hide()
    }

    MessageDialog {
        id: dialogWindow
        title: "And the winner is..."

        function hide(){
            visible = false
        }

        function show(winner){
            text ="<font color=\"" + systemP.buttonText + "\">" + winner + " just won</font>"
            open()
        }
    }
}
