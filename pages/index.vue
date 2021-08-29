<template>
  <div class="px-2 flex items-center justify-center h-screen w-screen">
    <div
      id="card"
      style="max-width: 455px"
      class="mx-auto p-5 bg-white rounded shadow-lg relative mt-10 pb-16"
    >
      <div class="flex justify-center items-center my-3">
        <img src="~/assets/images/MHESI.png" alt="MHUSI" class="h-32 mr-2" />
        <img src="~/assets/images/SSKRU.png" alt="SSKRU" class="h-32" />
      </div>
      <div class="py-10 text-center">
        <b class="text-xl">
          ระบบยืนยันตัวตนเพื่อขอรับสิทธิลดค่าเล่าเรียน ภาคเรียนที่ 1/2564
        </b>
        <br />
        <small>
          ตามโครงการมาตรการลดค่าใช้จ่ายด้านการศึกษาของนิสิตนักศึกษาในสถาบันอุดมศึกษาภาครัฐและเอกชน
        </small>
      </div>
      <form @submit.prevent="submit" class="px-5">
        <div>
          <label for="sid">รหัสนักศึกษา</label>
          <input
            id="sid"
            type="text"
            class="mt-1 block p-2 w-full bg-gray-100"
            v-model="form.sid"
            required
            autofocus
          />
        </div>

        <div class="mt-2">
          <label for="cid">รหัสบัตรประชาชน</label>
          <input
            id="cid"
            type="password"
            class="mt-1 block bg-gray-100 p-2 w-full"
            v-model="form.cid"
            required
          />
        </div>

        <div class="flex items-center justify-end mt-4">
          <button
            :class="`'px-3 py-2 bg-yellow-500 text-white rounded w-full ${
              loading && 'opacity-50'
            }`"
            :disabled="loading"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </form>
      <div
        class="
          p-3
          bg-green-50
          border border-green-100
          m-5
          font-light
          text-green-800
        "
      >
        การเข้าใช้งานระบบด้วย <b class="font-bold">รหัสนักศึกษา</b> และ<b
          class="font-bold"
          >รหัสบัตรประชาชน</b
        >
        ของท่านถือว่าเป็นการลงลายมือชื่อทางอิเล็กทรอนิกส์ ตามมาตรา ๙ ของ พ.ร.บ.
        ธุรกรรมทางอิเล็กทรอนิกส์ พ.ศ. ๒๕๔๔
        <br />
        <br />
        <button class="text-blue-600 font-light hover:underline">
          อ่านรายละเอียด
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'authLayout',
  data: () => ({
    form: { sid: null, sid: null },
    loading: false,
  }),
  async mounted() {
    try {
      await this.getMe()
      if (this.me && this.me.role && this.me.role === 'admin') {
        this.$router.push('/admin/students')
      } else {
        this.$router.push('/unconfirmed')
      }
    } catch (err) {
      console.log('no login')
    }
  },
  computed: {
    ...mapGetters('authen', ['me']),
  },
  methods: {
    ...mapActions('authen', ['getMe']),
    async submit() {
      this.loading = true
      try {
        const user = await this.$axios.$post('api/login', this.form)
        if (user.result.role && user.result.role === 'admin') {
          this.$router.push('/admin/students')
        } else {
          this.$router.push('/unconfirmed')
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: err?.response?.data?.message,
        })
      }
      this.loading = false
    },
  },
}
</script>

<style>
</style>