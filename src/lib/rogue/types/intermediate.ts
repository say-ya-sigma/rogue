import type { Coordinate, Edge } from "@/lib/rogue/types/base"

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

export type RoomsTouchEdge = {
  rooms: RoomWithWallThickness[],
  edge: Edge
}

export type NeighborRoomPair = {
  room1: RoomWithWallThickness,
  room2: RoomWithWallThickness,
  direction: 'horizontal' | 'vertical'
}

