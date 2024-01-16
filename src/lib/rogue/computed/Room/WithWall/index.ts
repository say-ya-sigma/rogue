import type { Edge, RoomWithInnerSquare, RoomWithWall, Square } from "@/lib/rogue/types"

export const getInnerSquare = (room: RoomWithWall): Square => {
  const { top, bottom, right, left } = room.outerSquare
  const {
    top: topThickness,
    bottom: bottomThickness,
    right: rightThickness,
    left: leftThickness
  } = room.wall
  const innerTopEdge: Edge = {
    from: {
      x: top.from.x + leftThickness,
      y: top.from.y + topThickness
    },
    to: {
      x: top.to.x - rightThickness,
      y: top.to.y + topThickness
    }
  }
  const innerBottomEdge: Edge = {
    from: {
      x: bottom.from.x + leftThickness,
      y: bottom.from.y - bottomThickness
    },
    to: {
      x: bottom.to.x - rightThickness,
      y: bottom.to.y - bottomThickness
    }
  }
  const innerRightEdge: Edge = {
    from: {
      x: right.from.x - rightThickness,
      y: right.from.y + topThickness
    },
    to: {
      x: right.to.x - rightThickness,
      y: right.to.y - bottomThickness
    }
  }
  const innerLeftEdge: Edge = {
    from: {
      x: left.from.x + leftThickness,
      y: left.from.y + topThickness
    },
    to: {
      x: left.to.x + leftThickness,
      y: left.to.y - bottomThickness
    }
  }
  return {
    top: innerTopEdge,
    bottom: innerBottomEdge,
    right: innerRightEdge,
    left: innerLeftEdge
  }
}

export const getRoomWithInnerSquare = (room: RoomWithWall): RoomWithInnerSquare => {
  return {
    uuid: room.uuid,
    outerSquare: room.outerSquare,
    innerSquare: getInnerSquare(room)
  }
}