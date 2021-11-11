<template>
  <div
    id="card"
    class="p-5 md:p-10 bg-white shadow-lg mx-auto text-sm md:text-lg"
    style="max-width: 1024px; min-height: 500px"
  >
    <div v-if="exists">
      <a :href="`pdf/${me.sid}.pdf`" download>
        <button
          class="animate-bounce bg-yellow-400 rounded-lg shadow-lg px-4 py-2"
        >
          ดาวน์โหลด
        </button>
      </a>
      <pdf :src="`pdf/${me.sid}.pdf`" />
    </div>
    <div v-else>noData</div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import { mapGetters } from 'vuex'
export default {
  components: {
    pdf,
  },
  data: () => ({
    exists: false,
  }),
  computed: {
    ...mapGetters('authen', ['me']),
  },
}
</script>