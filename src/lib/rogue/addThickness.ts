import type { Room } from "@/lib/rogue/types/base"
import type { RoomWithWallThickness } from "@/lib/rogue/types/intermediate"

export const addRandomThickness = (room: Room): RoomWithWallThickness => {
  const topEdgeThickness = Math.floor(Math.random() * 3) + 1
  const bottomEdgeThickness = Math.floor(Math.random() * 3) + 1
  const rightEdgeThickness = Math.floor(Math.random() * 3) + 1
  const leftEdgeThickness = Math.floor(Math.random() * 3) + 1
  return {
    ...room,
    topEdgeThickness,
    bottomEdgeThickness,
    rightEdgeThickness,
    leftEdgeThickness
  }
}
