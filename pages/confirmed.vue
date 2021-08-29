<template>
  <div
    id="card"
    class="p-5 md:p-10 bg-white shadow-lg mx-auto text-sm md:text-lg"
    style="max-width: 1024px"
  >
    <section>
      <div class="p-5 bg-gray-100 grid text-center mb-5">
        <span class="text-green-600 text-xl font-bold">
          {{
            me.status == 1
              ? 'ดำเนินการเรียบร้อยแล้ว'
              : me.status == 2
              ? 'ยื่นแบบขอรับเงินคืน'
              : 'พิมพ์บัตรลงทะเบียน'
          }}
        </span>
      </div>
    </section>
    <head-content />

    <student-details />

    <self-certificate />

    <study-details />
  </div>
</template>

<script>
import StudentDetails from '~/components/Shared/StudentDetails.vue'
import SelfCertificate from '~/components/Shared/SelfCertificate.vue'
import StudyDetails from '~/components/Shared/StudyDetails.vue'
import HeadContent from '~/components/Shared/HeadContent.vue'
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'
export default {
  middleware: 'confirmed',
  components: {
    StudentDetails,
    SelfCertificate,
    StudyDetails,
    HeadContent,
  },
  computed: {
    ...mapGetters('authen', ['me']),
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