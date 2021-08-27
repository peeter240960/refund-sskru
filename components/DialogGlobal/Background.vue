<template>
  <div
    class="bg-black h-screen fixed w-screen z-40 top-0 left-0"
    v-if="dialog"
    @click="isClose"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    dialog: false,
  }),
  watch: {
    isOpen(val) {
      this.dialog = val
    },
  },
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