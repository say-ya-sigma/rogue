export type Coordinate = {
  x: number,
  y: number
}

export type Edge = {
  from: Coordinate,
  to: Coordinate,
}

export type EdgeDirection = 'horizontal' | 'vertical'

export type Square = {
  top: Edge,
  bottom: Edge,
  right: Edge,
  left: Edge
}

export type Room = {
  uuid: string,
  outerSquare: Square
}

export type Corridor = {
  uuid: string,
  startRoomUuid: string,
  endRoomUuid: string,
  path: Coordinate[]
}

