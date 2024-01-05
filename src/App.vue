<template>
  <GridCanvas :matrix="matrix" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GridCanvas from './components/GridCanvas.vue'
import { Room, initMatrix, roomToMatrix, divideRoomRecursive } from './lib/rogue'

export default defineComponent({
  name: 'App',
  components: {
    GridCanvas,
  },
  setup() {
    const emptyMatrix = initMatrix(160,100)
    const rooms: Room[] = divideRoomRecursive(1000, 160, 100)
    const matrix = ref<number[][]>(rooms.reduce((matrix, room) => {
      return roomToMatrix(matrix, room)
    }, emptyMatrix))


    return {
      matrix,
    }
  },
})
</script>
