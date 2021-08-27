<template>
  <div class="bg-white shadow-lg rounded-2xl dialog" v-if="isOpen">
    top
    <slot />
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
.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 450px;
  width: 100%;
  z-index: 999;
}
</style>