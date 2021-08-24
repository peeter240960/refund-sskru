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
      <b>การดำเนินการ</b>
      <div class="p-5 bg-gray-100 grid">
        <button class="text-green-600 text-2xl font-bold">status</button>

        <nuxt-link
          to="refund"
          class="hover:underline hover:text-indigo-800 text-indigo-600 mx-auto"
        >
          ยื่นแบบขอรับเงินคืน
        </nuxt-link>
        <button class="hover:underline hover:text-indigo-800 text-indigo-600">
          Download ใบลงทะเบียน <i class="fas fa-file-download"></i>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import StudentDetails from '~/components/Shared/StudentDetails.vue'
import SelfCertificate from '~/components/Shared/SelfCertificate.vue'
import StudyDetails from '~/components/Shared/StudyDetails.vue'
import HeadContent from '~/components/Shared/HeadContent.vue'
import Swal from 'sweetalert2'
export default {
  components: {
    StudentDetails,
    SelfCertificate,
    StudyDetails,
    HeadContent,
  },
  methods: {
    submit() {
      Swal.fire({
        html: `ข้าพเจ้ามีความประสงค์จะ<br/>ยื่นความประสงค์ยืนยันสิทธิ์ส่วน<br/>ลดค่าเล่าเรียน<br/><br/>หรือหากไม่มีความประสงค์<br/>กรุณากดปุ่ม "Cancel"`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push('confirmed')
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