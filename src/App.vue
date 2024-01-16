<template>
  <GridCanvas :matrix="matrix" />
  <GridCanvas :matrix="roomsTouchEdgeMatrix" />
  <!-- <div v-for="(neighbor, index) in roomsTouchEdgeNeighborMatrix" :key="index">
    <GridCanvas :matrix="neighbor" />
  </div> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GridCanvas from '@/components/GridCanvas.vue'
import { divideRoomRecursive } from '@/lib/rogue/divideRoom'
import { addRandomThickness } from '@/lib/rogue/addThickness'
import {
  initMatrix,
  edgeToMatrix,
  roomToMatrix,
  roomToMatrixWithInnerSquare
} from '@/lib/rogue/canvasMatrix'
import { getRoomWithInnerSquare } from '@/lib/rogue/computed/Room/WithWall'
import { extractRoomsTouchEdge } from '@/lib/rogue/extractRoomsTouchEdge'
import { extractNeighbor } from '@/lib/rogue/extractNeighbor'
import type { GridCanvasMatrix } from './lib/rogue/types/canvas'

export default defineComponent({
  name: 'App',
  components: {
    GridCanvas,
  },
  setup() {
    const { rooms, edges } = divideRoomRecursive(1000, 160, 100)
    const roomsWithWall = rooms.map(addRandomThickness)
    const roomsWithInnerSquare = roomsWithWall.map(getRoomWithInnerSquare)
    const matrix = ref<GridCanvasMatrix>(roomsWithInnerSquare.reduce((matrix, room) => {
      return roomToMatrixWithInnerSquare(matrix, room)
    }, initMatrix(160,100)))

    const edgeMatrix = ref<GridCanvasMatrix>(edges.reduce((matrix, edge) => {
      return edgeToMatrix(matrix, edge)
    }, initMatrix(160,100)))

    const roomsTouchEdge = extractRoomsTouchEdge(roomsWithInnerSquare, edges[0])

    const roomsTouchEdgeMatrix = ref<GridCanvasMatrix>(roomsTouchEdge.rooms.reduce((matrix, room) => {
      return roomToMatrixWithInnerSquare(matrix, room)
    }, initMatrix(160,100)))

    const neighbor = extractNeighbor(roomsTouchEdge)
    const roomsTouchEdgeNeighborMatrix = ref<GridCanvasMatrix[]>(neighbor.map(({ room1, room2 }) => [room1, room2].reduce((matrix, room) => {
      return roomToMatrix(matrix, room)
    }, initMatrix(160,100))))

    return {
      matrix,
      edgeMatrix,
      roomsTouchEdgeMatrix,
      roomsTouchEdgeNeighborMatrix
    }
  },
})
</script>
