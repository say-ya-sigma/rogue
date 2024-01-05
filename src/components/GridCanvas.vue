<template>
  <canvas ref="gridCanvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'GridCanvas',
  props: {
    matrix: {
      type: Array as () => number[][],
      required: true,
    },
  },
  setup({ matrix}) {
    const gridCanvas = ref<HTMLCanvasElement>()

    const unitSize = 5
    onMounted(() => {
      const canvas = gridCanvas.value
      if (!canvas) { return }

      const ctx = canvas.getContext('2d')
      if (!ctx) { return }

      // unitSizeとmatrixのサイズからcanvasのサイズを決定
      const width = unitSize * matrix[0].length
      const height = unitSize * matrix.length
      canvas.width = width
      canvas.height = height

      // matrixの値に応じて色を塗る
      matrix.forEach((row, y) => {
        row.forEach((value, x) => {
          ctx.fillStyle = value ? 'black' : 'white'
          ctx.fillRect(x * unitSize, y * unitSize, unitSize, unitSize)
        })
      })
    })

    return {
      gridCanvas,
    }
  },
})
</script>