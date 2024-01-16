import type { Edge, Room } from "@/lib/rogue/types"
import type { RoomsTouchEdge } from "@/lib/rogue/types/intermediate"
import {
  detectDirection,
  isContactRoomHorizontal,
  isContactRoomVertical
} from "@/lib/rogue/common/detection"

export const extractRoomsTouchEdge = <T extends Room>(rooms: T[], edge: Edge): RoomsTouchEdge<T> => {
  const direction = detectDirection(edge)

  const roomsTouchEdge: T[] = []
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