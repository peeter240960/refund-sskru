<template>
  <div
    id="card"
    class="p-5 md:p-10 bg-white shadow-lg mx-auto text-sm md:text-lg"
    style="max-width: 1024px"
  >
    <head-content />

    <student-details />

    <self-certificate />

    <study-details />

    <section>
      <button
        @click="submit"
        class="px-4 py-2 bg-yellow-400 rounded-lg text-sm mr-3"
      >
        ยืนยันการยื่นคำร้อง
      </button>
      <nuxt-link to="unconfirmed" class="hover:underline">
        กลับไปแก้ไขข้อมูล
      </nuxt-link>
    </section>
  </div>
</template>

<script>
import StudentDetails from '~/components/Shared/StudentDetails.vue'
import SelfCertificate from '~/components/Shared/SelfCertificate.vue'
import StudyDetails from '~/components/Shared/StudyDetails.vue'
import HeadContent from '~/components/Shared/HeadContent.vue'
import Swal from 'sweetalert2'
import { mapGetters, mapMutations } from 'vuex'
export default {
  middleware: 'unconfirmed',
  components: {
    StudentDetails,
    SelfCertificate,
    StudyDetails,
    HeadContent,
  },
  computed: {
    ...mapGetters('access', ['getStep']),
    ...mapGetters('access', ['getAccess']),
    ...mapGetters('authen', ['me']),
  },
  mounted() {
    console.log(this.getStep)
    if (this.getStep < 2) this.$router.push('unconfirmed')
  },
  methods: {
    ...mapMutations('authen', ['setAuth']),
    getStatus() {
      let status
      if (this.getAccess.access == 1 && this.me && this.me.paidtype == 1) {
        status = 2
      } else if (
        this.getAccess.access == 2 &&
        this.me &&
        this.me.paidtype == 1
      ) {
        status = 1
      } else {
        status = 3
      }
      return status
    },
    submit() {
      Swal.fire({
        html: `ข้าพเจ้ามีความประสงค์จะ<br/>ยื่นความประสงค์ยืนยันสิทธิ์ส่วน<br/>ลดค่าเล่าเรียน<br/><br/>หรือหากไม่มีความประสงค์<br/>กรุณากดปุ่ม "Cancel"`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.$axios.$post('/api/admin/student_create', {
              students: [
                {
                  cid: this.me.cid,
                  right: this.getAccess.right,
                  scholarshiptype: this.getAccess.scholarshiptype,
                  loantype: this.getAccess.loantype,
                  confirm: this.getAccess.access,
                  status: this.getStatus(),
                },
              ],
            })
            this.setAuth({
              ...this.me,
              cid: this.me.cid,
              right: this.getAccess.right,
              scholarshiptype: this.getAccess.scholarshiptype,
              loantype: this.getAccess.loantype,
              confirm: this.getAccess.access,
              status: this.getStatus(),
            })

            if (this.me.paidtype == 1 && this.getAccess.access == 1) {
              this.$router.push('refund')
            } else {
              this.$router.push('confirmed')
            }
          } catch (err) {
            console.log('create user failed', err.message)
            Swal.fire({
              icon: 'error',
              text: err?.response?.data?.message,
            })
          }
        }
      })
    },
  },
}
</script>

<style>
.fa,
.fab,
.fad,
.fal,
.far,
.fas {
  display: inline;
}
.text-indent {
  text-indent: 50px;
}
@media only screen and (max-width: 768px) {
  /* For desktop: */
  .text-indent {
    text-indent: 25px;
  }
}
</style>