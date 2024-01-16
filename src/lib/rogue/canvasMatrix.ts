import type {
  Edge,
  GridCanvasMatrix,
  Room,
  RoomWithInnerSquare,
  RoomWithWall,
  Square
} from "@/lib/rogue/types"

export const initMatrix = (width: number, height: number) => {
  const matrix: GridCanvasMatrix = []
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

export const squareToMatrix = (matrix: GridCanvasMatrix, square: Square): GridCanvasMatrix => {
  edgeToMatrix(matrix, square.top)
  edgeToMatrix(matrix, square.bottom)
  edgeToMatrix(matrix, square.right)
  edgeToMatrix(matrix, square.left)
  return matrix
}

export const roomToMatrix = (matrix: GridCanvasMatrix, room: Room): GridCanvasMatrix => {
  squareToMatrix(matrix, room.outerSquare)
  return matrix
}

export const roomToMatrixWithWall = (matrix: GridCanvasMatrix, room: RoomWithWall): GridCanvasMatrix => {
  squareToMatrix(matrix, room.outerSquare)

  // 内側をthickness分だけ描画する
  const { top: topEdge, bottom: bottomEdge, right: rightEdge, left: leftEdge } = room.outerSquare
  const { top: topEdgeThickness, bottom: bottomEdgeThickness, right: rightEdgeThickness, left: leftEdgeThickness } = room.wall
  for (let i = 1; i <= topEdgeThickness; i++) {
    edgeToMatrix(matrix, {
      from: { x: topEdge.from.x, y: topEdge.from.y + i },
      to: { x: topEdge.to.x, y: topEdge.to.y + i }
    })
  }
  for (let i = 1; i <= bottomEdgeThickness; i++) {
    edgeToMatrix(matrix, {
      from: { x: bottomEdge.from.x, y: bottomEdge.from.y - i },
      to: { x: bottomEdge.to.x, y: bottomEdge.to.y - i }
    })
  }
  for (let i = 1; i <= leftEdgeThickness; i++) {
    edgeToMatrix(matrix, {
      from: { x: leftEdge.from.x + i, y: leftEdge.from.y },
      to: { x: leftEdge.to.x + i, y: leftEdge.to.y }
    })
  }
  for (let i = 1; i <= rightEdgeThickness; i++) {
    edgeToMatrix(matrix, {
      from: { x: rightEdge.from.x - i, y: rightEdge.from.y },
      to: { x: rightEdge.to.x - i, y: rightEdge.to.y }
    })
  }
  return matrix
}

export const roomToMatrixWithInnerSquare = (matrix: GridCanvasMatrix, room: RoomWithInnerSquare): GridCanvasMatrix => {
  squareToMatrix(matrix, room.outerSquare)
  squareToMatrix(matrix, room.innerSquare)
  return matrix
}
