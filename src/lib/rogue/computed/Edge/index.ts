import type { Edge, EdgeDirection } from '@/lib/rogue/types'

export const getDirection = (edge: Edge): EdgeDirection => {
  return edge.from.x === edge.to.x ? 'vertical' : 'horizontal'
}

export const getEdgeLength = (edge: Edge): number => {
  const direction = getDirection(edge)
  if (direction === 'vertical') {
    return Math.abs(edge.from.y - edge.to.y)
  } else {
    return Math.abs(edge.from.x - edge.to.x)
  }
}