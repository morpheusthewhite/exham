import QtQuick 2.0
import QtQuick.Shapes 1.12

Item {
    id: otic
    z: 50

    SystemPalette { id: oSP }

    Shape {
        anchors.fill: parent

        ShapePath{
            startX: otic.x + boxWidth/2;
            startY: otic.y
            fillColor: "transparent"

            strokeWidth: lineWidth
            strokeColor: oSP.midlight

            PathArc {
                x: otic.x + boxWidth/2; y: otic.y + boxHeight
                radiusX: boxHeight/2; radiusY: boxWidth/2
                useLargeArc: true
            }

        }


        ShapePath{
            startX: otic.x + boxWidth/2;
            startY: otic.y + boxHeight
            fillColor: "transparent"

            strokeWidth: lineWidth
            strokeColor: oSP.midlight

            PathArc {
                x: otic.x + boxWidth/2; y: otic.y
                radiusX: boxHeight/2; radiusY: boxWidth/2
                useLargeArc: true
            }
        }
    }
}
