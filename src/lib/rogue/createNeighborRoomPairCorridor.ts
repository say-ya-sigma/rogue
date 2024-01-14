import type { Coordinate, Corridor } from "@/lib/rogue/types/base"
import type { NeighborRoomPair } from "@/lib/rogue/types/intermediate"
import { v4 } from "uuid"

export const neighborRoomPairToCorridor = (neighborRoomPair: NeighborRoomPair): Corridor => {
  const { room1, room2 } = neighborRoomPair
  const startRoomUuid = room1.uuid
  const endRoomUuid = room2.uuid
  const path: Coordinate[] = []
  // TODO: Implement this

  return { uuid: v4(), startRoomUuid, endRoomUuid, path }
}
