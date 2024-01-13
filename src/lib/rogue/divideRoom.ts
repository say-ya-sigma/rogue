import type { Room, Edge } from "@/lib/rogue/types/base"
import { createInitialRoom, createRoom } from "@/lib/rogue/createRoom"
import { v4 } from "uuid"

export const divideRoomVertically = (room: Room): [Room, Room] => {
  const { topEdge, bottomEdge, leftEdge, rightEdge } = room
  const width = topEdge.edgeLength
  const diff = Math.floor((Math.random() * width * 0.2) + width * 0.4)
  const x = topEdge.from.x + diff
  const room1RightEdge = {
    from: { x, y: rightEdge.from.y },
    to: { x, y: rightEdge.to.y },
    edgeLength: rightEdge.edgeLength
  }
  const room1TopEdge = {
    from: topEdge.from,
    to: { x, y: topEdge.to.y },
    edgeLength: diff
  }
  const room1BottomEdge = {
    from: bottomEdge.from,
    to: { x, y: bottomEdge.to.y },
    edgeLength: diff
  }
  const room2LeftEdge = {
    from: { x: x + 1, y: room.leftEdge.from.y },
    to: { x: x + 1, y: room.leftEdge.to.y },
    edgeLength: room.leftEdge.edgeLength
  }
  const room2TopEdge = {
    from: { x: x + 1, y: topEdge.from.y },
    to: topEdge.to,
    edgeLength: width - diff - 1
  }
  const room2BottomEdge = {
    from: { x: x + 1, y: bottomEdge.from.y },
    to: bottomEdge.to,
    edgeLength: width - diff - 1
  }
  const room1 = createRoom(v4(), room1TopEdge, room1BottomEdge, room1RightEdge, leftEdge)
  const room2 = createRoom(v4(), room2TopEdge, room2BottomEdge, rightEdge, room2LeftEdge)
  return [room1, room2]
}

export const divideRoomHorizontally = (room: Room): [Room, Room] => {
  const { topEdge, bottomEdge, leftEdge, rightEdge } = room
  const height = leftEdge.edgeLength
  const diff = Math.floor((Math.random() * height * 0.2) + height * 0.4)
  const y = topEdge.from.y + diff
  const room1BottomEdge = {
    from: { x: bottomEdge.from.x, y },
    to: { x: bottomEdge.to.x, y },
    edgeLength: bottomEdge.edgeLength
  }
  const room1LeftEdge = {
    from: leftEdge.from,
    to: { x: leftEdge.to.x, y },
    edgeLength: diff
  }
  const room1RightEdge = {
    from: rightEdge.from,
    to: { x: rightEdge.to.x, y },
    edgeLength: diff
  }
  const room2TopEdge = {
    from: { x: topEdge.from.x, y: y + 1 },
    to: { x: topEdge.to.x, y: y + 1 },
    edgeLength: topEdge.edgeLength
  }
  const room2LeftEdge = {
    from: { x: leftEdge.from.x, y: y + 1 },
    to: leftEdge.to,
    edgeLength: height - diff - 1
  }
  const room2RightEdge = {
    from: { x: rightEdge.from.x, y: y + 1 },
    to: rightEdge.to,
    edgeLength: height - diff - 1
  }
  const room1 = createRoom(v4(), topEdge, room1BottomEdge, room1RightEdge, room1LeftEdge)
  const room2 = createRoom(v4(), room2TopEdge, bottomEdge, room2RightEdge, room2LeftEdge)
  return [room1, room2]
}

export const divideRoom = (room: Room): [[Room, Room], Edge] => {
  const direction = room.topEdge.edgeLength > room.rightEdge.edgeLength ? 'vertical' : 'horizontal'
  const [room1, room2] = direction === 'vertical' ? divideRoomVertically(room) : divideRoomHorizontally(room)
  return [[room1, room2], direction === 'vertical' ? room1.rightEdge : room1.bottomEdge]
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
    if (room.area < area) {
      leafRooms.push(room)
      continue
    }
    const [rooms, edge] = divideRoom(room)
    roomStack.push(...rooms)
    divideEdges.push(edge)
  }
  return { rooms: leafRooms, edges: divideEdges }
}
