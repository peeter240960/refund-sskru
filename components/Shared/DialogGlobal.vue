<template>
  <div>
    <background :isOpen="dialog" @isClose="isClose">
      <span class=" text-light">top</span>
    </background>
  </div>
</template>

<script>
import Background from '../DialogGlobal/Background.vue'
export default {
  components: { Background },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isOpen(val) {
      this.dialog = val
    },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    isClose() {
      this.dialog = false
      this.$emit('isClose')
    },
  },
}
</script>

<style>
</style>