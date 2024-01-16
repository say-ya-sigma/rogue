import { describe, expect, it } from "vitest";
import { isIncludeEdgeHorizontal, isIncludeEdgeVertical } from "./detection";

describe('isIncludeEdgeHorizontal', () => {
  it('regular case', () => {
    const bigEdge = {
      from: { x: 0, y: 0 },
      to: { x: 10, y: 0 }
    }
    const smallEdge = {
      from: { x: 1, y: 0 },
      to: { x: 9, y: 0 }
    }
    expect(isIncludeEdgeHorizontal(bigEdge, smallEdge)).toBe(true)
  })
  it('not include case', () => {
    const bigEdge = {
      from: { x: 0, y: 0 },
      to: { x: 10, y: 0 }
    }
    const smallEdge = {
      from: { x: 1, y: 0 },
      to: { x: 11, y: 0 }
    }
    expect(isIncludeEdgeHorizontal(bigEdge, smallEdge)).toBe(false)
  })
  it('not same horizontal line case', () => {
    const bigEdge = {
      from: { x: 0, y: 0 },
      to: { x: 10, y: 0 }
    }
    const smallEdge = {
      from: { x: 1, y: 1 },
      to: { x: 9, y: 1 }
    }
    expect(isIncludeEdgeHorizontal(bigEdge, smallEdge)).toBe(false)
  })
})

describe('isIncludeEdgeVertical', () => {
  it('regular case', () => {
    const bigEdge = {
      from: { x: 0, y: 0 },
      to: { x: 0, y: 10 }
    }
    const smallEdge = {
      from: { x: 0, y: 1 },
      to: { x: 0, y: 9 }
    }
    expect(isIncludeEdgeVertical(bigEdge, smallEdge)).toBe(true)
  })
  it('not include case', () => {
    const bigEdge = {
      from: { x: 0, y: 0 },
      to: { x: 0, y: 10 }
    }
    const smallEdge = {
      from: { x: 0, y: 1 },
      to: { x: 0, y: 11 }
    }
    expect(isIncludeEdgeVertical(bigEdge, smallEdge)).toBe(false)
  })
  it('not same vertical line case', () => {
    const bigEdge = {
      from: { x: 0, y: 0 },
      to: { x: 0, y: 10 }
    }
    const smallEdge = {
      from: { x: 1, y: 1 },
      to: { x: 1, y: 9 }
    }
    expect(isIncludeEdgeVertical(bigEdge, smallEdge)).toBe(false)
  })
})