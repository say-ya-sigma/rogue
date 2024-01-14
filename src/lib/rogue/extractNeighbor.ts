import type { Edge } from "@/lib/rogue/types/base"
import type { NeighborRoomPair, RoomWithWallThickness, RoomsTouchEdge } from "@/lib/rogue/types/intermediate"
import { detectDirection, isTouchEdgeHorizontal, isTouchEdgeVertical } from "@/lib/rogue/common/detection"

export const extractNeighborHorizontal = (roomsTouchEdge: RoomsTouchEdge): NeighborRoomPair[] => {
  const { rooms, edge } = roomsTouchEdge
  const upperRooms: RoomWithWallThickness[] = rooms.filter(room => room.center.y < edge.from.y)
  const lowerRooms: RoomWithWallThickness[] = rooms.filter(room => room.center.y > edge.from.y)
  const neighborRoomPairs: NeighborRoomPair[] = []

  for (let i = 0; i < upperRooms.length; i++) {
    const upperRoom = upperRooms[i]
    const upperRoomAfterEdge: Edge = {
      from: { x: upperRoom.bottomEdge.from.x, y: upperRoom.bottomEdge.from.y + 1 },
      to: { x: upperRoom.bottomEdge.to.x, y: upperRoom.bottomEdge.to.y + 1 }
    }
    for (let j = 0; j < lowerRooms.length; j++) {
      const lowerRoom = lowerRooms[j]
      if (
        isTouchEdgeHorizontal(upperRoomAfterEdge, lowerRoom.topEdge, 3)
      ) {
        neighborRoomPairs.push({ room1: upperRoom, room2: lowerRoom, direction: 'horizontal' })
      }
    }
  }

  return neighborRoomPairs
}

export const extractNeighborVertical = (roomsTouchEdge: RoomsTouchEdge): NeighborRoomPair[] => {
  const { rooms, edge } = roomsTouchEdge
  const leftRooms: RoomWithWallThickness[] = rooms.filter(room => room.center.x < edge.from.x)
  const rightRooms: RoomWithWallThickness[] = rooms.filter(room => room.center.x > edge.from.x)
  const neighborRoomPairs: NeighborRoomPair[] = []

  for (let i = 0; i < leftRooms.length; i++) {
    const leftRoom = leftRooms[i]
    const leftRoomAfterEdge: Edge = {
      from: { x: leftRoom.rightEdge.from.x + 1, y: leftRoom.rightEdge.from.y },
      to: { x: leftRoom.rightEdge.to.x + 1, y: leftRoom.rightEdge.to.y }
    }
    for (let j = 0; j < rightRooms.length; j++) {
      const rightRoom = rightRooms[j]
      if (
        isTouchEdgeVertical(leftRoomAfterEdge, rightRoom.leftEdge, 3)
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