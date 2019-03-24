import QtQuick 2.0
import QtQuick.Shapes 1.12

Item {
    id: xtic

    SystemPalette { id: xSP }

    Shape {
        // line going from the top-left corner to the bottom-right one
        id: xshape
        ShapePath{
            id: xFirstLine
            startX: x
            startY: y
            strokeWidth: lineWidth
            strokeColor: xSP.light

            PathLine{
                relativeX: x + boxWidth
                relativeY: y + boxHeight
            }
        }

        ShapePath{
            id: xSecondLine
            startX: x
            startY: y + boxHeight
            strokeWidth: lineWidth
            strokeColor: xSP.light

            PathLine{
                relativeX: x + boxWidth
                relativeY: y - boxHeight
            }
        }

    }
}
