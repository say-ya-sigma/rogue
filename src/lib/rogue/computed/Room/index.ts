import type { Coordinate, Room } from "@/lib/rogue/types"
import { getEdgeLength } from "@/lib/rogue/computed/Edge"

export const getWidth = (room: Room): number => {
  return getEdgeLength(room.outerSquare.top)
}

export const getHeight = (room: Room): number => {
  return getEdgeLength(room.outerSquare.right)
}

export const getArea = (room: Room): number => {
  return getWidth(room) * getHeight(room)
}

export const getCenter = (room: Room): Coordinate => {
  const { top, right } = room.outerSquare
  const x = top.from.x + Math.floor(getWidth(room) / 2)
  const y = right.from.y + Math.floor(getHeight(room) / 2)
  return { x, y }
}