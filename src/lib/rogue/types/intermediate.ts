import type { Edge, Square } from "@/lib/rogue/types/base"

export type RoomWithWallThickness = {
  uuid: string,
  outerSquare: Square,
  topEdgeThickness: number,
  bottomEdgeThickness: number,
  rightEdgeThickness: number,
  leftEdgeThickness: number
}

export type RoomsTouchEdge = {
  rooms: RoomWithWallThickness[],
  edge: Edge
}

export type NeighborRoomPair = {
  room1: RoomWithWallThickness,
  room2: RoomWithWallThickness,
  direction: 'horizontal' | 'vertical'
}

