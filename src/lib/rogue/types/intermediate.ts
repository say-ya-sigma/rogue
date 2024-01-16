import type { Edge, Square } from "@/lib/rogue/types/base"

export type Wall = {
  top: number,
  bottom: number,
  right: number,
  left: number
}

export type RoomWithWall = {
  uuid: string,
  outerSquare: Square,
  wall: Wall
}

export type RoomWithInnerSquare = {
  uuid: string,
  outerSquare: Square,
  innerSquare: Square
}

export type RoomsTouchEdge = {
  rooms: RoomWithWall[],
  edge: Edge
}

export type NeighborRoomPair = {
  room1: RoomWithWall,
  room2: RoomWithWall,
  direction: 'horizontal' | 'vertical'
}

