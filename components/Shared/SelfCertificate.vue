<template>
  <section class="mb-5 mx-8">
    <p><b>การรับรองสิทธิตนเอง</b></p>
    <div class="border p-5" id="self">
      <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
        <div class="font-bold">มีสิทธิเบิกจากหน่วยงานของรัฐ</div>
        <div>
          {{
            getAccess.right == 1
              ? `มีสิทธิเบิกจากหน่วยงานของรัฐ`
              : `-`
          }}
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
        <div class="font-bold">
          ได้รับทุนการศึกษายกเว้นค่า <br />ธรรมเนียมการศึกษา
        </div>
        <div>
          {{
            getAccess.scholarshiptype == 1
              ? ``
              : `-`
          }}
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
        <div class="font-bold">
          กองทุนเงินให้กู้ยืมเพื่อการศึกษา <br />
          (กยศ.)
        </div>
        <div>
          {{
            getAccess.loantype == 1
              ? `กู้กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.)`
              : `ไม่ได้กู้กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.)`
          }}
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
        <div class="font-bold">หมายเลขอ้างอิงการตรวจสอบ clearing house</div>
        <div>{{ me.timestamp }}</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
        <div class="font-bold">
          การรับรองสิทธิด้วยการเข้าสู่ระบบอิเล็กทรอนิกส์
        </div>
        <div>
          <span>เข้าสู่ระบบด้วย</span> {{ me.macaddress }}
          <br />
          {{ getAccess.confirmlog }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('access', ['getAccess']),
    ...mapGetters('authen', ['me']),
  },
}
</script>

<style>
</style>