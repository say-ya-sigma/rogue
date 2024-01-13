import type { Edge } from "@/lib/rogue/types/base"
import type { RoomWithWallThickness, RoomsTouchEdge } from "@/lib/rogue/types/intermediate"
import {
  detectDirection,
  isContactRoomHorizontal,
  isContactRoomVertical
} from "@/lib/rogue/common/detection"

export const extractRoomsTouchEdge = (rooms: RoomWithWallThickness[], edge: Edge): RoomsTouchEdge => {
  const direction = detectDirection(edge)

  const roomsTouchEdge: RoomWithWallThickness[] = []
  if (direction === 'horizontal') {
    rooms.forEach(room => {
      if (isContactRoomHorizontal(edge, room)) {
        roomsTouchEdge.push(room)
      }
    })
  } else {
    rooms.forEach(room => {
      if (isContactRoomVertical(edge, room)) {
        roomsTouchEdge.push(room)
      }
    })
  }
  return { rooms: roomsTouchEdge, edge }
}