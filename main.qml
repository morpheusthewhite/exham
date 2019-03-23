import QtQuick 2.6
import QtQuick.Window 2.2
import QtQuick.Controls 1.0
import QtQuick.Shapes 1.12

import "qml"
import "src/util.js" as Util

ApplicationWindow {
    id: main

    width: 300
    height: 300
    visible: true

    color: systemP.window

    property int borderSpace: 10
    property int sepSpace: 10
    property int cellWidth: (width - borderSpace*2 - sepSpace*2)/3
    property int cellHeight: (height - borderSpace*2 - sepSpace*2)/3
    property int padding: 4

    property int lineWidth: sepSpace - 2*padding
    property int lineLength: width - 2*borderSpace

    SystemPalette { id: systemP; colorGroup: SystemPalette.Active}

    Repeater{
        model: 9

        Cell { height: main.cellHeight; width: main.cellWidth
            row: index%3; column: Math.floor(index/3) }
    }

    Shape{
        ShapePath {
            strokeColor: systemP.mid
            strokeWidth: lineWidth
            capStyle: ShapePath.RoundCap

            startX: Util.getLineX(1, true)
            startY: Util.getLineY(1, true)

            PathLine{
                relativeX: lineLength
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
                relativeX: lineLength
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
                relativeY: lineLength
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
                relativeY: lineLength
            }
        }
    }
}
