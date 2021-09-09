<template>
  <div
    id="card"
    class="p-5 md:p-10 bg-white shadow-lg mx-auto text-sm md:text-lg"
    style="max-width: 1024px"
  >
    <section class="text-center">
      <b
        >แบบขอรับเงินค่าเล่าเรียน ภาคเรียนที่ 1/2564 คืน <br />
        ตามโครงการมาตรการการลดค่าใช้จ่ายด้านการศึกษาของนิสิตนักศึกษาในสถาบันอุดมศึกษาภาครัฐและเอกชน
        <br />
        มหาวิทยาลัยราชภัฏศรีสะเกษ
      </b>
    </section>

    <section class="mt-5">
      <p class="text-indent">
        ด้วยข้าพเจ้า {{ me.title }} {{ me.firstname }}
        {{ me.lastname }} เลขประจำตัวประชาชน
        {{ me.cid }} นักศึกษามหาวิทยาลัยราชภัฏศรีสะเกษ ระดับ
        {{ getLavel }} สาขาวิชา {{ me.program }} คณะ {{ me.faculty }} อยู่
        {{ me.address }}
      </p>
      <p class="text-indent">
        มีความประสงค์ขอรับเงินค่าเล่าเรียนประจำภาคเรียนที่  1/2564 คืน 
        ตามโครงการมาตรการการลดค่าใช้จ่ายด้านการศึกษาของนิสิตนักศึกษาในสถาบันอุดมศึกษาภาครัฐและเอกชน
        เป็นจำนวนเงิน  {{ me.refund }} บาท
      </p>
    </section>

    <section class="mt-5">
      <p class="text-indent">
        ขอรับเงินผ่านระบบ KTB Corporate Online
        โดยได้แนบสำเนาบัตรประจำตัวประชาชนมาเพื่อเป็นหลักฐานด้วยแล้ว *
        ทั้งนี้ต้องเป็นบัญชีที่ผูกกับพร้อมเพย์เลขบัตรประจำตัวประชาชนเท่านั้น
      </p>
    </section>
    <section class="">
      <p class="text-indent">
        และเมื่อมหาวิทยาลัยราชภัฏศรีสะเกษ โอนเงินผ่านระบบ KTB Corporate Online
        แล้ว <br />
        ให้ส่งข้อมูลการโอนเงินผ่านช่องทาง
      </p>
    </section>

    <section class="mt-5 mx-8 md:mx-20">
      <div class="mb-5 grid sm:flex sm:flex-wrap">
        <div>
          <input
            type="checkbox"
            :checked="form.tel != null || (form.tel && form.tel.length < 1)"
          />
          ข้อความแจ้งเตือนผ่านโทรศัพท์มือถือ (SMS) ที่เบอร์โทรศัพท์
        </div>
        <input
          type="text"
          v-model="form.tel"
          :disabled="me.status == 1"
          class="py-1 px-2 bg-gray-50 rounded sm:ml-1"
        />
      </div>
      <div class="mb-5 grid sm:flex sm:flex-wrap">
        <div>
          <input
            type="checkbox"
            :checked="
              form.email != null || (form.email && form.email.length < 1)
            "
          />
          จดหมายอิเล็กทรอนิกส์ (e-mail) ตาม e-mail address
        </div>
        <input
          type="text"
          v-model="form.email"
          :disabled="me.status == 1"
          class="py-1 px-2 bg-gray-50 rounded sm:ml-1"
        />
      </div>
    </section>

    <section class="mt-5">
      <p class="text-indent">ทั้งนี้ ได้แนบสำเนาบัตรประชาชนมาพร้อมนี้</p>
    </section>

    <section class="mt-5 border p-5">
      <div class="grid mb-3">
        <b>สำเนาบัตรประจำตัวประชาชน <small class="text-red-500">*</small> </b>
        <div class="flex items-center bg-gray-50 px-2">
          <i class="fas fa-file-upload text-2xl"></i>
          <input
            type="file"
            class="py-1 px-2 rounded w-full"
            ref="file"
            @change="upload"
          />
        </div>
      </div>
    </section>

    <section class="mt-5">
      <input type="checkbox" id="access" v-model="access" />
      <label for="access" class="font-bold">
        ข้าพเจ้าขอรับรองว่าบิดามารดาไม่สามารถเบิกเงินสวัสดิการเกี่ยวกับการศึกษาบุตร
        ตามสิทธิสวัสดิการของข้าราชการของผู้ปกครองได้
        หากปรากฏภายหลังว่าข้าพเจ้ามีสิทธิเบิกเงินดังกล่าว
        ข้าพเจ้ายินยอมให้มหาวิทยาลัยเรียกเก็บเงินคืนได้
        ซึ่งจะต้องชำระให้แล้วเสร็จก่อนถึงจะสามารถลงทะเบียนในภาคการศึกษาถัดไปหรือยื่นขอสำเร็จการศึกษาได้
      </label>
    </section>

    <section class="mt-5" v-if="me.status != 1 && access">
      <button
        class="px-4 py-2 bg-yellow-400 rounded-lg text-sm mr-3"
        @click="update"
      >
        ยื่นคำร้อง
      </button>
    </section>
  </div>
</template>

<script>
import StudentDetails from '~/components/Shared/StudentDetails.vue'
import SelfCertificate from '~/components/Shared/SelfCertificate.vue'
import StudyDetails from '~/components/Shared/StudyDetails.vue'
import HeadContent from '~/components/Shared/HeadContent.vue'
import { mapGetters, mapMutations } from 'vuex'
import Swal from 'sweetalert2'
export default {
  // middleware: 'refund',
  components: {
    StudentDetails,
    SelfCertificate,
    StudyDetails,
    HeadContent,
  },
  data: () => ({
    form: {
      bank: 0,
      branch: null,
      bookbanktype: 0,
      bookbank: null,
      tel: null,
      email: null,
    },
    file: null,
    access: false,
  }),
  computed: {
    ...mapGetters('authen', ['me']),
    getLavel() {
      switch (this.me.level) {
        case '4':
          return 'ปริญญาตรี'
        case '5':
          return 'ประกาศนียบัตรบัณฑิต'
        case '6':
          return 'ปริญญาโท'
        case '8':
          return 'ปริญญาเอก'
        default:
          return null
      }
    },
  },
  mounted() {
    this.form.bank = this.me.bank || 0
    this.form.branch = this.me.branch
    this.form.bookbanktype = this.me.bookbanktype || 0
    this.form.bookbank = this.me.bookbank
    this.form.tel = this.me.tel
    this.form.email = this.me.email
  },
  methods: {
    ...mapMutations('authen', ['setAuth']),
    async upload(e) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file, file.name)
      formData.append('sid', this.me.sid)
      try {
        const resp = await this.$axios.$post('/api/upload', formData, {})
        this.file = resp.result
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          html: `${err?.response?.data?.message}`,
        })
      }
    },
    async update() {
      if (!this.file) {
        Swal.fire({
          icon: 'error',
          html: `กรุณาอัพโหลดไฟล์`,
        })
        return false
      }
      try {
        await this.$axios.$post('/api/admin/student_create', {
          students: [{ ...this.form, cid: this.me.cid, status: 1 }],
        })
        this.setAuth({ ...this.me, status: 1 })
        this.$router.push('/confirmed')
        Swal.fire({
          icon: 'success',
          html: `ดำเนินการสำเร็จ`,
        })
      } catch (err) {
        console.log('create user failed', err.message)
        Swal.fire({
          icon: 'error',
          text: err?.response?.data?.message,
        })
      }
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