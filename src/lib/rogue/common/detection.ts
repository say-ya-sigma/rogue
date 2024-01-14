import type { Edge, Room } from "@/lib/rogue/types/base"

export const detectDirection = (edge: Edge): 'vertical' | 'horizontal' => {
  return edge.from.x === edge.to.x ? 'vertical' : 'horizontal'
}

export const isTouchEdgeHorizontal = (edge1: Edge, edge2: Edge, offset: number = 0): boolean => {
  const isSameHorizontalLine = edge1.from.y === edge2.from.y
  if (!isSameHorizontalLine) {
    return false
  }

  // 線分が包含関係にある
  const isInclude = isIncludeEdgeHorizontal(edge1, edge2)
  const isIncluded = isIncludeEdgeHorizontal(edge2, edge1)
  if (isInclude || isIncluded) {
    return true
  }

  // 始点か終点のどちらかを含む
  const isTouchFrom = edge1.from.x + offset <= edge2.from.x && edge2.from.x <= edge1.to.x - offset
  const isTouchTo = edge1.from.x + offset <= edge2.to.x && edge2.to.x <= edge1.to.x - offset
  return isTouchFrom || isTouchTo
}

export const isTouchEdgeVertical = (edge1: Edge, edge2: Edge, offset: number = 0): boolean => {
  const isSameVerticalLine = edge1.from.x === edge2.from.x
  if (!isSameVerticalLine) {
    return false
  }

  // 線分が包含関係にある
  const isInclude = isIncludeEdgeVertical(edge1, edge2)
  const isIncluded = isIncludeEdgeVertical(edge2, edge1)
  if (isInclude || isIncluded) {
    return true
  }

  // 始点か終点のどちらかを含む
  const isTouchFrom = edge1.from.y + offset <= edge2.from.y && edge2.from.y <= edge1.to.y - offset
  const isTouchTo = edge1.from.y + offset <= edge2.to.y && edge2.to.y <= edge1.to.y - offset
  return isTouchFrom || isTouchTo
}

export const isIncludeEdgeHorizontal = (bigEdge: Edge, smallEdge: Edge): boolean => {
  const isSameHorizontalLine = bigEdge.from.y === smallEdge.from.y
  if (!isSameHorizontalLine) {
    return false
  }

  const isIncludeFrom = bigEdge.from.x <= smallEdge.from.x && smallEdge.from.x <= bigEdge.to.x
  const isIncludeTo = bigEdge.from.x <= smallEdge.to.x && smallEdge.to.x <= bigEdge.to.x
  return isIncludeFrom && isIncludeTo
}

export const isIncludeEdgeVertical = (bigEdge: Edge, smallEdge: Edge): boolean => {
  const isSameVerticalLine = bigEdge.from.x === smallEdge.from.x
  if (!isSameVerticalLine) {
    return false
  }

  const isIncludeFrom = bigEdge.from.y <= smallEdge.from.y && smallEdge.from.y <= bigEdge.to.y
  const isIncludeTo = bigEdge.from.y <= smallEdge.to.y && smallEdge.to.y <= bigEdge.to.y
  return isIncludeFrom && isIncludeTo
}

export const isContactRoomHorizontal = (edge: Edge, room: Room): boolean => {
  const afterEdge: Edge = {
    from: { x: edge.from.x, y: edge.from.y + 1 },
    to: { x: edge.to.x, y: edge.to.y + 1 }
  }
  return isIncludeEdgeHorizontal(edge, room.topEdge) ||
    isIncludeEdgeHorizontal(edge, room.bottomEdge) ||
    isIncludeEdgeHorizontal(afterEdge, room.topEdge) ||
    isIncludeEdgeHorizontal(afterEdge, room.bottomEdge)
}

export const isContactRoomVertical = (edge: Edge, room: Room): boolean => {
  const afterEdge: Edge = {
    from: { x: edge.from.x + 1, y: edge.from.y },
    to: { x: edge.to.x + 1, y: edge.to.y }
  }
  return isIncludeEdgeVertical(edge, room.leftEdge) ||
    isIncludeEdgeVertical(edge, room.rightEdge) ||
    isIncludeEdgeVertical(afterEdge, room.leftEdge) ||
    isIncludeEdgeVertical(afterEdge, room.rightEdge)
}
