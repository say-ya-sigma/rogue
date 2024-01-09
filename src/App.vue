<template>
  <GridCanvas :matrix="matrix" />
  <!-- <div v-for="(neighbor, index) in roomsTouchEdgeNeighborMatrix" :key="index">
    <GridCanvas :matrix="neighbor" />
  </div> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GridCanvas from './components/GridCanvas.vue'
import {
  initMatrix,
  roomToMatrix,
  divideRoomRecursive,
  edgeToMatrix,
  extractRoomsTouchEdge,
  extractNeighbor,
  addRandomThickness,
} from './lib/rogue'

export default defineComponent({
  name: 'App',
  components: {
    GridCanvas,
  },
  setup() {
    const { rooms, edges } = divideRoomRecursive(1000, 160, 100)
    const roomsWithThickness = rooms.map(addRandomThickness)
    const matrix = ref<number[][]>(roomsWithThickness.reduce((matrix, room) => {
      return roomToMatrix(matrix, room, true)
    }, initMatrix(160,100)))

    const edgeMatrix = ref<number[][]>(edges.reduce((matrix, edge) => {
      return edgeToMatrix(matrix, edge)
    }, initMatrix(160,100)))

    const roomsTouchEdge = extractRoomsTouchEdge(roomsWithThickness, edges[0])

    const roomsTouchEdgeMatrix = ref<number[][]>(roomsTouchEdge.rooms.reduce((matrix, room) => {
      return roomToMatrix(matrix, room)
    }, initMatrix(160,100)))

    const neighbor = extractNeighbor(roomsTouchEdge)
    const roomsTouchEdgeNeighborMatrix = ref<number[][][]>(neighbor.map(({ room1, room2 }) => [room1, room2].reduce((matrix, room) => {
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
