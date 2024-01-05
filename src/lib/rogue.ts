export type Coordinate = {
  x: number,
  y: number
}

export type Edge = {
  from: Coordinate,
  to: Coordinate,
  edgeLength: number
}

export type Room = {
  uuid: string,
  center: Coordinate,
  height: number,
  width: number,
  area: number,
  topEdge: Edge,
  bottomEdge: Edge,
  rightEdge: Edge,
  leftEdge: Edge
}

export type Corridor = {
  uuid: string,
  startRoomUuid: string,
  endRoomUuid: string,
  path: Coordinate[]
}

export const createInitialRoom = (uuid: string, width: number, height: number): Room => {
  const center = { x: Math.floor(width / 2), y: Math.floor(height / 2) }
  const topEdge = { from: { x: 0, y: 0 }, to: { x: width - 1, y: 0 }, edgeLength: width }
  const bottomEdge = { from: { x: 0, y: height - 1 }, to: { x: width - 1, y: height - 1 }, edgeLength: width }
  const rightEdge = { from: { x: width - 1, y: 0 }, to: { x: width - 1, y: height - 1 }, edgeLength: height }
  const leftEdge = { from: { x: 0, y: 0 }, to: { x: 0, y: height - 1 }, edgeLength: height }
  return { uuid, center, area: width * height, height, width, topEdge, bottomEdge, rightEdge, leftEdge }
}

export const createRoom = (uuid: string, topEdge: Edge, bottomEdge: Edge, rightEdge: Edge, leftEdge: Edge): Room => {
  const width = topEdge.edgeLength
  const height = rightEdge.edgeLength
  const center = { x: Math.floor(width / 2), y: Math.floor(height / 2) }
  const area = width * height
  return { uuid, center, area, height, width, topEdge, bottomEdge, rightEdge, leftEdge }
}

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
  const room1 = createRoom(room.uuid, room1TopEdge, room1BottomEdge, room1RightEdge, leftEdge)
  const room2 = createRoom(room.uuid, room2TopEdge, room2BottomEdge, rightEdge, room2LeftEdge)
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
  const room1 = createRoom(room.uuid, topEdge, room1BottomEdge, room1RightEdge, room1LeftEdge)
  const room2 = createRoom(room.uuid, room2TopEdge, bottomEdge, room2RightEdge, room2LeftEdge)
  return [room1, room2]
}

export const divideRoom = (room: Room): [Room, Room] => {
  const direction = room.topEdge.edgeLength > room.rightEdge.edgeLength ? 'vertical' : 'horizontal'
  const [room1, room2] = direction === 'vertical' ? divideRoomVertically(room) : divideRoomHorizontally(room)
  return [room1, room2]
}

export type GridCanvasMatrix = number[][]

export const initMatrix = (width: number, height: number) => {
  const matrix: number[][] = []
  for (let y = 0; y < height; y++) {
    matrix.push([])
    for (let x = 0; x < width; x++) {
      matrix[y].push(0)
    }
  }
  return matrix
}

export const roomToMatrix = (matrix: GridCanvasMatrix, room: Room): GridCanvasMatrix => {
  // roomのtopEdge, bottomEdge, leftEdge, rightEdgeを1にする
  for (let x = room.topEdge.from.x; x <= room.topEdge.to.x; x++) {
    matrix[room.topEdge.from.y][x] = 1
  }
  for (let x = room.bottomEdge.from.x; x <= room.bottomEdge.to.x; x++) {
    matrix[room.bottomEdge.from.y][x] = 1
  }
  for (let y = room.leftEdge.from.y; y <= room.leftEdge.to.y; y++) {
    matrix[y][room.leftEdge.from.x] = 1
  }
  for (let y = room.rightEdge.from.y; y <= room.rightEdge.to.y; y++) {
    matrix[y][room.rightEdge.from.x] = 1
  }
  return matrix
}

export const divideRoomRecursive = (area: number, startWidth: number, startHeight: number) => {
  const bigRoom = createInitialRoom('1', startWidth, startHeight)
  const roomStack: Room[] = [bigRoom]
  const rooms: Room[] = []

  while (roomStack.length > 0) {
    const room = roomStack.pop()
    if (room.area < area) {
      rooms.push(room)
      continue
    }
    roomStack.push(...divideRoom(room))
  }
  return rooms
}
