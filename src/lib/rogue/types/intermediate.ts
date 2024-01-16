import type { Edge, Room, Square } from "@/lib/rogue/types/base"

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

export type RoomsTouchEdge<T extends Room> = {
  rooms: T[],
  edge: Edge
}

export type NeighborRoomPair<T extends Room> = {
  room1: T,
  room2: T,
  direction: 'horizontal' | 'vertical'
}

