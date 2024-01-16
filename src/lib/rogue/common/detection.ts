import type { Edge, Room } from "@/lib/rogue/types/base"

export const detectDirection = (edge: Edge): 'vertical' | 'horizontal' => {
  return edge.from.x === edge.to.x ? 'vertical' : 'horizontal'
}

export const isTouchEdgeHorizontal = (edge1: Edge, edge2: Edge, offset: number = 0): boolean => {
  const isSameHorizontalLine = edge1.from.y === edge2.from.y
  if (!isSameHorizontalLine) {
    return false
  }

  let offsetEdge1: Edge = edge1
  if (offset !== 0) {
    offsetEdge1 = {
      from: { x: edge1.from.x + offset, y: edge1.from.y },
      to: { x: edge1.to.x - offset, y: edge1.to.y }
    }
  }
  // 線分が包含関係にある
  const isInclude = isIncludeEdgeHorizontal(offsetEdge1, edge2)
  const isIncluded = isIncludeEdgeHorizontal(edge2, offsetEdge1)
  if (isInclude || isIncluded) {
    return true
  }

  // 始点か終点のどちらかを含む
  const isTouchFrom = offsetEdge1.from.x <= edge2.from.x && edge2.from.x <= offsetEdge1.to.x
  const isTouchTo = offsetEdge1.from.x <= edge2.to.x && edge2.to.x <= offsetEdge1.to.x
  return isTouchFrom || isTouchTo
}

export const isTouchEdgeVertical = (edge1: Edge, edge2: Edge, offset: number = 0): boolean => {
  const isSameVerticalLine = edge1.from.x === edge2.from.x
  if (!isSameVerticalLine) {
    return false
  }

  let offsetEdge1: Edge = edge1
  if (offset !== 0) {
    offsetEdge1 = {
      from: { x: edge1.from.x, y: edge1.from.y + offset },
      to: { x: edge1.to.x, y: edge1.to.y - offset }
    }
  }
  // 線分が包含関係にある
  const isInclude = isIncludeEdgeVertical(offsetEdge1, edge2)
  const isIncluded = isIncludeEdgeVertical(edge2, offsetEdge1)
  if (isInclude || isIncluded) {
    return true
  }

  // 始点か終点のどちらかを含む
  const isTouchFrom = offsetEdge1.from.y <= edge2.from.y && edge2.from.y <= offsetEdge1.to.y
  const isTouchTo = offsetEdge1.from.y <= edge2.to.y && edge2.to.y <= offsetEdge1.to.y
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
  const { top, bottom } = room.outerSquare
  return isIncludeEdgeHorizontal(edge, top) ||
    isIncludeEdgeHorizontal(edge, bottom) ||
    isIncludeEdgeHorizontal(afterEdge, top) ||
    isIncludeEdgeHorizontal(afterEdge, bottom)
}

export const isContactRoomVertical = (edge: Edge, room: Room): boolean => {
  const afterEdge: Edge = {
    from: { x: edge.from.x + 1, y: edge.from.y },
    to: { x: edge.to.x + 1, y: edge.to.y }
  }
  const { left, right } = room.outerSquare
  return isIncludeEdgeVertical(edge, left) ||
    isIncludeEdgeVertical(edge, right) ||
    isIncludeEdgeVertical(afterEdge, left) ||
    isIncludeEdgeVertical(afterEdge, right)
}
