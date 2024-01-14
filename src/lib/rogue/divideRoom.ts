import type { Room, Edge } from "@/lib/rogue/types"
import { createInitialRoom, createRoom } from "@/lib/rogue/createRoom"
import { v4 } from "uuid"
import { getEdgeLength } from "@/lib/rogue/computed/Edge"
import { getArea } from "@/lib/rogue/computed/Room"

export const divideRoomVertically = (room: Room): [Room, Room] => {
  const { top: topEdge, bottom: bottomEdge, right: rightEdge, left: leftEdge } = room.outerSquare
  const width = getEdgeLength(topEdge)
  const diff = Math.floor((Math.random() * width * 0.2) + width * 0.4)
  const x = topEdge.from.x + diff
  const room1RightEdge: Edge = {
    from: { x, y: rightEdge.from.y },
    to: { x, y: rightEdge.to.y }
  }
  const room1TopEdge: Edge = {
    from: topEdge.from,
    to: { x, y: topEdge.to.y }
  }
  const room1BottomEdge: Edge = {
    from: bottomEdge.from,
    to: { x, y: bottomEdge.to.y }
  }
  const room2LeftEdge: Edge = {
    from: { x: x + 1, y: leftEdge.from.y },
    to: { x: x + 1, y: leftEdge.to.y }
  }
  const room2TopEdge: Edge = {
    from: { x: x + 1, y: topEdge.from.y },
    to: topEdge.to
  }
  const room2BottomEdge: Edge = {
    from: { x: x + 1, y: bottomEdge.from.y },
    to: bottomEdge.to
  }
  const room1 = createRoom(v4(), room1TopEdge, room1BottomEdge, room1RightEdge, leftEdge)
  const room2 = createRoom(v4(), room2TopEdge, room2BottomEdge, rightEdge, room2LeftEdge)
  return [room1, room2]
}

export const divideRoomHorizontally = (room: Room): [Room, Room] => {
  const { top: topEdge, bottom: bottomEdge, right: rightEdge, left: leftEdge } = room.outerSquare
  const height = getEdgeLength(leftEdge)
  const diff = Math.floor((Math.random() * height * 0.2) + height * 0.4)
  const y = topEdge.from.y + diff
  const room1BottomEdge: Edge = {
    from: { x: bottomEdge.from.x, y },
    to: { x: bottomEdge.to.x, y }
  }
  const room1LeftEdge: Edge = {
    from: leftEdge.from,
    to: { x: leftEdge.to.x, y }
  }
  const room1RightEdge: Edge = {
    from: rightEdge.from,
    to: { x: rightEdge.to.x, y }
  }
  const room2TopEdge: Edge = {
    from: { x: topEdge.from.x, y: y + 1 },
    to: { x: topEdge.to.x, y: y + 1 }
  }
  const room2LeftEdge: Edge = {
    from: { x: leftEdge.from.x, y: y + 1 },
    to: leftEdge.to
  }
  const room2RightEdge: Edge = {
    from: { x: rightEdge.from.x, y: y + 1 },
    to: rightEdge.to
  }
  const room1 = createRoom(v4(), topEdge, room1BottomEdge, room1RightEdge, room1LeftEdge)
  const room2 = createRoom(v4(), room2TopEdge, bottomEdge, room2RightEdge, room2LeftEdge)
  return [room1, room2]
}

export const divideRoom = (room: Room): [[Room, Room], Edge] => {
  const direction = getEdgeLength(room.outerSquare.top) > getEdgeLength(room.outerSquare.right) ? 'vertical' : 'horizontal'
  const [room1, room2] = direction === 'vertical' ? divideRoomVertically(room) : divideRoomHorizontally(room)
  return [[room1, room2], direction === 'vertical' ? room1.outerSquare.right : room1.outerSquare.bottom]
}

export const divideRoomRecursive = (
  area: number,
  startWidth: number,
  startHeight: number
): { rooms: Room[], edges: Edge[] } => {
  const bigRoom = createInitialRoom(v4(), startWidth, startHeight)
  const roomStack: Room[] = [bigRoom]
  const leafRooms: Room[] = []
  const divideEdges: Edge[] = []

  while (roomStack.length > 0) {
    const room = roomStack.pop()
    if (!room) {
      continue
    }
    if (getArea(room) < area) {
      leafRooms.push(room)
      continue
    }
    const [rooms, edge] = divideRoom(room)
    roomStack.push(...rooms)
    divideEdges.push(edge)
  }
  return { rooms: leafRooms, edges: divideEdges }
}
