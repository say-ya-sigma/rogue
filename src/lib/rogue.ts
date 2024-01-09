import { v4 } from "uuid"

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

export type RoomWithWallThickness = {
  uuid: string,
  center: Coordinate,
  height: number,
  width: number,
  area: number,
  topEdge: Edge,
  bottomEdge: Edge,
  rightEdge: Edge,
  leftEdge: Edge,
  topEdgeThickness: number,
  bottomEdgeThickness: number,
  rightEdgeThickness: number,
  leftEdgeThickness: number
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
  const height = leftEdge.edgeLength
  const center = {
    x: topEdge.from.x + Math.floor(width / 2),
    y: topEdge.from.y + Math.floor(height / 2)
  }
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

export const edgeToMatrix = (matrix: GridCanvasMatrix, edge: Edge): GridCanvasMatrix => {
  if (edge.from.x === edge.to.x) {
    // vertical
    for (let y = edge.from.y; y <= edge.to.y; y++) {
      matrix[y][edge.from.x] = 1
    }
  } else {
    // horizontal
    for (let x = edge.from.x; x <= edge.to.x; x++) {
      matrix[edge.from.y][x] = 1
    }
  }
  return matrix
}

export const roomToMatrix = (matrix: GridCanvasMatrix, room: RoomWithWallThickness, withThickness: boolean = false): GridCanvasMatrix => {
  // roomのtopEdge, bottomEdge, leftEdge, rightEdgeを1にする
  edgeToMatrix(matrix, room.topEdge)
  edgeToMatrix(matrix, room.bottomEdge)
  edgeToMatrix(matrix, room.rightEdge)
  edgeToMatrix(matrix, room.leftEdge)

  if (withThickness) {
    // 内側をthickness分だけ描画する
    const { topEdge, bottomEdge, leftEdge, rightEdge } = room
    const topEdgeThickness = room.topEdgeThickness
    const bottomEdgeThickness = room.bottomEdgeThickness
    const leftEdgeThickness = room.leftEdgeThickness
    const rightEdgeThickness = room.rightEdgeThickness
    for (let i = 1; i <= topEdgeThickness; i++) {
      edgeToMatrix(matrix, {
        from: { x: topEdge.from.x, y: topEdge.from.y + i },
        to: { x: topEdge.to.x, y: topEdge.to.y + i },
        edgeLength: topEdge.edgeLength
      })
    }
    for (let i = 1; i <= bottomEdgeThickness; i++) {
      edgeToMatrix(matrix, {
        from: { x: bottomEdge.from.x, y: bottomEdge.from.y - i },
        to: { x: bottomEdge.to.x, y: bottomEdge.to.y - i },
        edgeLength: bottomEdge.edgeLength
      })
    }
    for (let i = 1; i <= leftEdgeThickness; i++) {
      edgeToMatrix(matrix, {
        from: { x: leftEdge.from.x + i, y: leftEdge.from.y },
        to: { x: leftEdge.to.x + i, y: leftEdge.to.y },
        edgeLength: leftEdge.edgeLength
      })
    }
    for (let i = 1; i <= rightEdgeThickness; i++) {
      edgeToMatrix(matrix, {
        from: { x: rightEdge.from.x - i, y: rightEdge.from.y },
        to: { x: rightEdge.to.x - i, y: rightEdge.to.y },
        edgeLength: rightEdge.edgeLength
      })
    }
  }
  return matrix
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

export const addRandomThickness = (room: Room): RoomWithWallThickness => {
  const topEdgeThickness = Math.floor(Math.random() * 3) + 1
  const bottomEdgeThickness = Math.floor(Math.random() * 3) + 1
  const rightEdgeThickness = Math.floor(Math.random() * 3) + 1
  const leftEdgeThickness = Math.floor(Math.random() * 3) + 1
  return {
    ...room,
    topEdgeThickness,
    bottomEdgeThickness,
    rightEdgeThickness,
    leftEdgeThickness
  }
}

const detectDirection = (edge: Edge): 'vertical' | 'horizontal' => {
  return edge.from.x === edge.to.x ? 'vertical' : 'horizontal'
}

const isTouchEdgeHorizontal = (edge1: Edge, edge2: Edge, offset: number = 0): boolean => {
  const isSameHorizontalLine = edge1.from.y === edge2.from.y
  if (!isSameHorizontalLine) {
    return false
  }

  // 線分が包含関係にある
  const isInclude = isIncludeEdgeHorizontal(edge1, edge2)
  const isIncluded = isIncludeEdgeHorizontal(edge2, edge1)
  if (isInclude || isIncluded) {
    return true
  }

  // 始点か終点のどちらかを含む
  const isTouchFrom = edge1.from.x + offset <= edge2.from.x && edge2.from.x <= edge1.to.x - offset
  const isTouchTo = edge1.from.x + offset <= edge2.to.x && edge2.to.x <= edge1.to.x - offset
  return isTouchFrom || isTouchTo
}

const isTouchEdgeVertical = (edge1: Edge, edge2: Edge, offset: number = 0): boolean => {
  const isSameVerticalLine = edge1.from.x === edge2.from.x
  if (!isSameVerticalLine) {
    return false
  }

  // 線分が包含関係にある
  const isInclude = isIncludeEdgeVertical(edge1, edge2)
  const isIncluded = isIncludeEdgeVertical(edge2, edge1)
  if (isInclude || isIncluded) {
    return true
  }

  // 始点か終点のどちらかを含む
  const isTouchFrom = edge1.from.y + offset <= edge2.from.y && edge2.from.y <= edge1.to.y - offset
  const isTouchTo = edge1.from.y + offset <= edge2.to.y && edge2.to.y <= edge1.to.y - offset
  return isTouchFrom || isTouchTo
}

const isIncludeEdgeHorizontal = (bigEdge: Edge, smallEdge: Edge): boolean => {
  const isSameHorizontalLine = bigEdge.from.y === smallEdge.from.y
  if (!isSameHorizontalLine) {
    return false
  }

  const isIncludeFrom = bigEdge.from.x <= smallEdge.from.x && smallEdge.from.x <= bigEdge.to.x
  const isIncludeTo = bigEdge.from.x <= smallEdge.to.x && smallEdge.to.x <= bigEdge.to.x
  return isIncludeFrom && isIncludeTo
}

const isIncludeEdgeVertical = (bigEdge: Edge, smallEdge: Edge): boolean => {
  const isSameVerticalLine = bigEdge.from.x === smallEdge.from.x
  if (!isSameVerticalLine) {
    return false
  }

  const isIncludeFrom = bigEdge.from.y <= smallEdge.from.y && smallEdge.from.y <= bigEdge.to.y
  const isIncludeTo = bigEdge.from.y <= smallEdge.to.y && smallEdge.to.y <= bigEdge.to.y
  return isIncludeFrom && isIncludeTo
}

const isContactRoomHorizontal = (edge: Edge, room: Room): boolean => {
  const afterEdge: Edge = {
    from: { x: edge.from.x, y: edge.from.y + 1 },
    to: { x: edge.to.x, y: edge.to.y + 1 },
    edgeLength: edge.edgeLength
  }
  return isIncludeEdgeHorizontal(edge, room.topEdge) ||
    isIncludeEdgeHorizontal(edge, room.bottomEdge) ||
    isIncludeEdgeHorizontal(afterEdge, room.topEdge) ||
    isIncludeEdgeHorizontal(afterEdge, room.bottomEdge)
}

const isContactRoomVertical = (edge: Edge, room: Room): boolean => {
  const afterEdge: Edge = {
    from: { x: edge.from.x + 1, y: edge.from.y },
    to: { x: edge.to.x + 1, y: edge.to.y },
    edgeLength: edge.edgeLength
  }
  return isIncludeEdgeVertical(edge, room.leftEdge) ||
    isIncludeEdgeVertical(edge, room.rightEdge) ||
    isIncludeEdgeVertical(afterEdge, room.leftEdge) ||
    isIncludeEdgeVertical(afterEdge, room.rightEdge)
}

type RoomsTouchEdge = {
  rooms: RoomWithWallThickness[],
  edge: Edge
}

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

type NeighborRoomPair = {
  room1: RoomWithWallThickness,
  room2: RoomWithWallThickness,
  direction: 'horizontal' | 'vertical'
}

export const extractNeighborHorizontal = (roomsTouchEdge: RoomsTouchEdge): NeighborRoomPair[] => {
  const { rooms, edge } = roomsTouchEdge
  const upperRooms: RoomWithWallThickness[] = rooms.filter(room => room.center.y < edge.from.y)
  const lowerRooms: RoomWithWallThickness[] = rooms.filter(room => room.center.y > edge.from.y)
  const neighborRoomPairs: NeighborRoomPair[] = []

  for (let i = 0; i < upperRooms.length; i++) {
    const upperRoom = upperRooms[i]
    const upperRoomAfterEdge: Edge = {
      from: { x: upperRoom.bottomEdge.from.x, y: upperRoom.bottomEdge.from.y + 1 },
      to: { x: upperRoom.bottomEdge.to.x, y: upperRoom.bottomEdge.to.y + 1 },
      edgeLength: upperRoom.bottomEdge.edgeLength
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
      to: { x: leftRoom.rightEdge.to.x + 1, y: leftRoom.rightEdge.to.y },
      edgeLength: leftRoom.rightEdge.edgeLength
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
  return direction === 'horizontal' ? extractNeighborHorizontal(roomsTouchEdge) : extractNeighborVertical(roomsTouchEdge)
}

export const neighborRoomPairToCorridor = (neighborRoomPair: NeighborRoomPair): Corridor => {
  const { room1, room2 } = neighborRoomPair
  const startRoomUuid = room1.uuid
  const endRoomUuid = room2.uuid
  const path: Coordinate[] = []


  return { uuid: v4(), startRoomUuid, endRoomUuid, path }
}
