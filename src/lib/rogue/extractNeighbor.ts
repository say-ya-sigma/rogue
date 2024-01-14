import type { Edge, NeighborRoomPair, RoomWithWall, RoomsTouchEdge } from "@/lib/rogue/types"
import { detectDirection, isTouchEdgeHorizontal, isTouchEdgeVertical } from "@/lib/rogue/common/detection"
import { getCenter } from "@/lib/rogue/computed/Room"

export const extractNeighborHorizontal = (roomsTouchEdge: RoomsTouchEdge): NeighborRoomPair[] => {
  const { rooms, edge } = roomsTouchEdge
  const upperRooms: RoomWithWall[] = rooms.filter(room => getCenter(room).y < edge.from.y)
  const lowerRooms: RoomWithWall[] = rooms.filter(room => getCenter(room).y > edge.from.y)
  const neighborRoomPairs: NeighborRoomPair[] = []

  for (let i = 0; i < upperRooms.length; i++) {
    const upperRoom = upperRooms[i]
    const { bottom, top } = upperRoom.outerSquare
    const upperRoomAfterEdge: Edge = {
      from: { x: bottom.from.x, y: bottom.from.y + 1 },
      to: { x: bottom.to.x, y: bottom.to.y + 1 }
    }
    for (let j = 0; j < lowerRooms.length; j++) {
      const lowerRoom = lowerRooms[j]
      if (
        isTouchEdgeHorizontal(upperRoomAfterEdge, top, 3)
      ) {
        neighborRoomPairs.push({ room1: upperRoom, room2: lowerRoom, direction: 'horizontal' })
      }
    }
  }

  return neighborRoomPairs
}

export const extractNeighborVertical = (roomsTouchEdge: RoomsTouchEdge): NeighborRoomPair[] => {
  const { rooms, edge } = roomsTouchEdge
  const leftRooms: RoomWithWall[] = rooms.filter(room => getCenter(room).x < edge.from.x)
  const rightRooms: RoomWithWall[] = rooms.filter(room => getCenter(room).x > edge.from.x)
  const neighborRoomPairs: NeighborRoomPair[] = []

  for (let i = 0; i < leftRooms.length; i++) {
    const leftRoom = leftRooms[i]
    const { right, left } = leftRoom.outerSquare
    const leftRoomAfterEdge: Edge = {
      from: { x: right.from.x + 1, y: right.from.y },
      to: { x: right.to.x + 1, y: right.to.y }
    }
    for (let j = 0; j < rightRooms.length; j++) {
      const rightRoom = rightRooms[j]
      if (
        isTouchEdgeVertical(leftRoomAfterEdge, left, 3)
      ) {
        neighborRoomPairs.push({ room1: leftRoom, room2: rightRoom, direction: 'vertical' })
      }
    }
  }

  return neighborRoomPairs
}

export const extractNeighbor = (roomsTouchEdge: RoomsTouchEdge): NeighborRoomPair[] => {
  const direction = detectDirection(roomsTouchEdge.edge)
  return direction === 'horizontal'
    ? extractNeighborHorizontal(roomsTouchEdge)
    : extractNeighborVertical(roomsTouchEdge)
}