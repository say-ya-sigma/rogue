import { describe, expect, it } from "vitest";
import { isTouchEdgeHorizontal, isTouchEdgeVertical } from "./detection";

describe('isTouchEdgeHorizontal', () => {
  it('regular case: inclusion is touch', () => {
    const edge1 = {
      from: { x: 0, y: 0 },
      to: { x: 10, y: 0 }
    }
    const edge2 = {
      from: { x: 1, y: 0 },
      to: { x: 9, y: 0 }
    }
    expect(isTouchEdgeHorizontal(edge1, edge2)).toBe(true)
    expect(isTouchEdgeHorizontal(edge2, edge1)).toBe(true)
  })
  it('regular case: inclusion is touch narrowed by offset', () => {
    const edge1 = {
      from: { x: 0, y: 0 },
      to: { x: 10, y: 0 }
    }
    const edge2 = {
      from: { x: 1, y: 0 },
      to: { x: 9, y: 0 }
    }
    const offset = 3
    expect(isTouchEdgeHorizontal(edge1, edge2, offset)).toBe(true)
    expect(isTouchEdgeHorizontal(edge2, edge1, offset)).toBe(true)
  })
  it('corner case: if only the offset result is inclusion relationship', () => {
    const edge1 = {
      from: { x: 0, y: 0 }, // after offset { x: 3, y: 0 }
      to: { x: 10, y: 0 } // after offset { x: 7, y: 0 }
    }
    const edge2 = {
      from: { x: 2, y: 0 },
      to: { x: 12, y: 0 }
    }
    const offset = 3
    expect(isTouchEdgeHorizontal(edge1, edge2, offset)).toBe(true)
    expect(isTouchEdgeHorizontal(edge2, edge1, offset)).toBe(true)
  })
  it('regular case: when from is included to edge, edges have touched', () => {
    const edge1 = {
      from: { x: 0, y: 0 },
      to: { x: 10, y: 0 }
    }
    const edge2 = {
      from: { x: 5, y: 0 },
      to: { x: 15, y: 0 }
    }
    expect(isTouchEdgeHorizontal(edge1, edge2)).toBe(true)
    expect(isTouchEdgeHorizontal(edge2, edge1)).toBe(true)
  })
  it('regular case: when from is included to edge narrowed by offset, edges have touched', () => {
    const edge1 = {
      from: { x: 0, y: 0 },
      to: { x: 10, y: 0 }
    }
    const edge2 = {
      from: { x: 5, y: 0 },
      to: { x: 15, y: 0 }
    }
    const offset = 3
    expect(isTouchEdgeHorizontal(edge1, edge2, offset)).toBe(true)
    expect(isTouchEdgeHorizontal(edge2, edge1, offset)).toBe(true)
  })
  it('regular case: when to is included to edge, edges have touched', () => {
    const edge1 = {
      from: { x: 5, y: 0 },
      to: { x: 15, y: 0 }
    }
    const edge2 = {
      from: { x: 0, y: 0 },
      to: { x: 10, y: 0 }
    }
    expect(isTouchEdgeHorizontal(edge1, edge2)).toBe(true)
    expect(isTouchEdgeHorizontal(edge2, edge1)).toBe(true)
  })
  it('regular case: when to is included to edge narrowed by offset, edges have touched', () => {
    const edge1 = {
      from: { x: 5, y: 0 },
      to: { x: 15, y: 0 }
    }
    const edge2 = {
      from: { x: 0, y: 0 },
      to: { x: 10, y: 0 }
    }
    const offset = 3
    expect(isTouchEdgeHorizontal(edge1, edge2, offset)).toBe(true)
    expect(isTouchEdgeHorizontal(edge2, edge1, offset)).toBe(true)
  })
  it('not touch case', () => {
    const edge1 = {
      from: { x: 0, y: 0 },
      to: { x: 10, y: 0 }
    }
    const edge2 = {
      from: { x: 11, y: 0 },
      to: { x: 21, y: 0 }
    }
    expect(isTouchEdgeHorizontal(edge1, edge2)).toBe(false)
    expect(isTouchEdgeHorizontal(edge2, edge1)).toBe(false)
  })
  it('not same line case', () => {
    const edge1 = {
      from: { x: 0, y: 0 },
      to: { x: 10, y: 0 }
    }
    const edge2 = {
      from: { x: 1, y: 1 },
      to: { x: 9, y: 1 }
    }
    expect(isTouchEdgeHorizontal(edge1, edge2)).toBe(false)
    expect(isTouchEdgeHorizontal(edge2, edge1)).toBe(false)
  })
})

describe('isTouchEdgeVertical', () => {
  it('regular case: inclusion is touch', () => {
    const edge1 = {
      from: { x: 0, y: 0 },
      to: { x: 0, y: 10 }
    }
    const edge2 = {
      from: { x: 0, y: 1 },
      to: { x: 0, y: 9 }
    }
    expect(isTouchEdgeVertical(edge1, edge2)).toBe(true)
    expect(isTouchEdgeVertical(edge2, edge1)).toBe(true)
  })
  it('regular case: inclusion is touch narrowed by offset', () => {
    const edge1 = {
      from: { x: 0, y: 0 },
      to: { x: 0, y: 10 }
    }
    const edge2 = {
      from: { x: 0, y: 1 },
      to: { x: 0, y: 9 }
    }
    const offset = 3
    expect(isTouchEdgeVertical(edge1, edge2, offset)).toBe(true)
    expect(isTouchEdgeVertical(edge2, edge1, offset)).toBe(true)
  })
  it('corner case: if only the offset result is inclusion relationship', () => {
    const edge1 = {
      from: { x: 0, y: 0 }, // after offset { x: 0, y: 3 }
      to: { x: 0, y: 10 } // after offset { x: 0, y: 7 }
    }
    const edge2 = {
      from: { x: 0, y: 2 },
      to: { x: 0, y: 12 }
    }
    const offset = 3
    expect(isTouchEdgeVertical(edge1, edge2, offset)).toBe(true)
    expect(isTouchEdgeVertical(edge2, edge1, offset)).toBe(true)
  })
  it('regular case: when from is included to edge, edges have touched', () => {
    const edge1 = {
      from: { x: 0, y: 0 },
      to: { x: 0, y: 10 }
    }
    const edge2 = {
      from: { x: 0, y: 5 },
      to: { x: 0, y: 15 }
    }
    expect(isTouchEdgeVertical(edge1, edge2)).toBe(true)
    expect(isTouchEdgeVertical(edge2, edge1)).toBe(true)
  })
  it('regular case: when from is included to edge narrowed by offset, edges have touched', () => {
    const edge1 = {
      from: { x: 0, y: 0 },
      to: { x: 0, y: 10 }
    }
    const edge2 = {
      from: { x: 0, y: 5 },
      to: { x: 0, y: 15 }
    }
    const offset = 3
    expect(isTouchEdgeVertical(edge1, edge2, offset)).toBe(true)
    expect(isTouchEdgeVertical(edge2, edge1, offset)).toBe(true)
  })
  it('regular case: when to is included to edge, edges have touched', () => {
    const edge1 = {
      from: { x: 0, y: 5 },
      to: { x: 0, y: 15 }
    }
    const edge2 = {
      from: { x: 0, y: 0 },
      to: { x: 0, y: 10 }
    }
    expect(isTouchEdgeVertical(edge1, edge2)).toBe(true)
    expect(isTouchEdgeVertical(edge2, edge1)).toBe(true)
  })
  it('regular case: when to is included to edge narrowed by offset, edges have touched', () => {
    const edge1 = {
      from: { x: 0, y: 5 },
      to: { x: 0, y: 15 }
    }
    const edge2 = {
      from: { x: 0, y: 0 },
      to: { x: 0, y: 10 }
    }
    const offset = 3
    expect(isTouchEdgeVertical(edge1, edge2, offset)).toBe(true)
    expect(isTouchEdgeVertical(edge2, edge1, offset)).toBe(true)
  })
  it('not touch case', () => {
    const edge1 = {
      from: { x: 0, y: 0 },
      to: { x: 0, y: 10 }
    }
    const edge2 = {
      from: { x: 0, y: 11 },
      to: { x: 0, y: 21 }
    }
    expect(isTouchEdgeVertical(edge1, edge2)).toBe(false)
    expect(isTouchEdgeVertical(edge2, edge1)).toBe(false)
  })
  it('not same line case', () => {
    const edge1 = {
      from: { x: 0, y: 0 },
      to: { x: 0, y: 10 }
    }
    const edge2 = {
      from: { x: 1, y: 1 },
      to: { x: 1, y: 9 }
    }
    expect(isTouchEdgeVertical(edge1, edge2)).toBe(false)
    expect(isTouchEdgeVertical(edge2, edge1)).toBe(false)
  })
})