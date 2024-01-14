import type {
  Room,
  Edge
} from "@/lib/rogue/types"
import { getEdgeLength } from "@/lib/rogue/computed/Edge"

export const createInitialRoom = (uuid: string, width: number, height: number): Room => {
  const center = { x: Math.floor(width / 2), y: Math.floor(height / 2) }
  const topEdge = { from: { x: 0, y: 0 }, to: { x: width - 1, y: 0 }, edgeLength: width }
  const bottomEdge = { from: { x: 0, y: height - 1 }, to: { x: width - 1, y: height - 1 }, edgeLength: width }
  const rightEdge = { from: { x: width - 1, y: 0 }, to: { x: width - 1, y: height - 1 }, edgeLength: height }
  const leftEdge = { from: { x: 0, y: 0 }, to: { x: 0, y: height - 1 }, edgeLength: height }
  return { uuid, center, area: width * height, height, width, topEdge, bottomEdge, rightEdge, leftEdge }
}

export const createRoom = (uuid: string, topEdge: Edge, bottomEdge: Edge, rightEdge: Edge, leftEdge: Edge): Room => {
  const width = getEdgeLength(topEdge)
  const height = getEdgeLength(leftEdge)
  const center = {
    x: topEdge.from.x + Math.floor(width / 2),
    y: topEdge.from.y + Math.floor(height / 2)
  }
  const area = width * height
  return { uuid, center, area, height, width, topEdge, bottomEdge, rightEdge, leftEdge }
}
