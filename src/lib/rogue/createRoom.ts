import type {
  Room,
  Edge
} from "@/lib/rogue/types"

export const createInitialRoom = (uuid: string, width: number, height: number): Room => {
  const top = { from: { x: 0, y: 0 }, to: { x: width - 1, y: 0 }, edgeLength: width }
  const bottom = { from: { x: 0, y: height - 1 }, to: { x: width - 1, y: height - 1 }, edgeLength: width }
  const right = { from: { x: width - 1, y: 0 }, to: { x: width - 1, y: height - 1 }, edgeLength: height }
  const left = { from: { x: 0, y: 0 }, to: { x: 0, y: height - 1 }, edgeLength: height }
  return {
    uuid,
    outerSquare: {
      top,
      bottom,
      right,
      left
    }
  }
}

export const createRoom = (uuid: string, top: Edge, bottom: Edge, right: Edge, left: Edge): Room => {
  return { uuid, outerSquare: { top, bottom, right, left } }
}
