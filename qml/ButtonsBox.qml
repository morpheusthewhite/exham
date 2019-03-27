import QtQuick 2.0
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4

Rectangle {
    id: buttonsBox

    SystemPalette { id: spBB }

    property int margin: 10
    property int heightPadding: 10

    signal matchStart

    Button {
        id: startButton

        anchors.verticalCenter: parent.verticalCenter
        anchors.horizontalCenter: parent.horizontalCenter

        style: ButtonStyle {
                background: Rectangle {
                implicitWidth: 100
                implicitHeight: 25
                radius: 4
                color: spBB.button
            }
        }

        onClicked: matchStart()

        height: buttonsBox.height - heightPadding
        text: "Start game"
    }

    gradient: Gradient{
        GradientStop { position: 0.0; color: "transparent" }
        GradientStop { position: 1.0; color: spBB.dark }
    }
}
