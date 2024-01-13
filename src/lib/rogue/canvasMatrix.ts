import type { Edge } from "@/lib/rogue/types/base"
import type { RoomWithWallThickness } from "@/lib/rogue/types/intermediate"
import type { GridCanvasMatrix } from "@/lib/rogue/types/canvas"

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
