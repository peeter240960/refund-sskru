<template>
  <div>
    <main class="container mx-auto">
      <nuxt />
    </main>
  </div>
</template>
<script>
export default {
  name: 'homeLayout',
}
</script>
<style scoped>
body {
  background: url('~/static/images/bg.jpg');
  background-size: cover;
}
</style>