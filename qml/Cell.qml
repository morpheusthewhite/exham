import QtQuick 2.0

import "../src/util.js" as Util

Item {
    id: cell
    property var row
    property var column

    x: Util.getCellX(row)
    y: Util.getCellY(column)

    signal clicked()

    Rectangle {
        id: rectangle
        anchors.fill: parent
        color: "transparent"
    }

    MouseArea {
        id: mouseArea
        anchors.fill: parent
        onClicked: cell.clicked()
    }
}
