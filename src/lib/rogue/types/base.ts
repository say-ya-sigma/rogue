export type Coordinate = {
  x: number,
  y: number
}

export type Edge = {
  from: Coordinate,
  to: Coordinate,
}

export type EdgeDirection = 'horizontal' | 'vertical'

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

export type Corridor = {
  uuid: string,
  startRoomUuid: string,
  endRoomUuid: string,
  path: Coordinate[]
}

