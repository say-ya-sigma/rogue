import type { Room, RoomWithWall } from "@/lib/rogue/types"

export const addRandomThickness = (room: Room): RoomWithWall => {
  const top = Math.floor(Math.random() * 3) + 1
  const bottom = Math.floor(Math.random() * 3) + 1
  const right = Math.floor(Math.random() * 3) + 1
  const left = Math.floor(Math.random() * 3) + 1
  return {
    ...room,
    wall: {
      top,
      bottom,
      right,
      left
    }
  }
}
