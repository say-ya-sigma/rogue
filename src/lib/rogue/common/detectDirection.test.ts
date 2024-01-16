import { expect, it, describe } from "vitest";
import { detectDirection } from "./detection";
import type { Edge } from "@/lib/rogue/types";

describe('detectDirection', () => {
  it('vertical', () => {
    const verticalEdge: Edge = {
      from: { x: 0, y: 0 },
      to: { x: 0, y: 1 }
    }
    expect(detectDirection(verticalEdge)).toBe('vertical')
  })
  it('horizontal', () => {
    const horizontalEdge: Edge = {
      from: { x: 0, y: 0 },
      to: { x: 1, y: 0 }
    }
    expect(detectDirection(horizontalEdge)).toBe('horizontal')
  })
})