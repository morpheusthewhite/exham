import QtQuick 2.0

import "../src/util.js" as Util

Item {
    id: cell
    property var row
    property var column

    signal clicked

    x: Util.getCellX(column)
    y: Util.getCellY(row)

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
