<template>
  <section class="mb-5 mx-8">
    <p><b>การรับรองสิทธิตนเอง</b></p>
    <div class="border p-5" id="self">
      <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
        <div class="font-bold">มีสิทธิเบิกจากหน่วยงานของรัฐ</div>
        <div>
          {{
            access.right == 1
              ? `มีสิทธิเบิกจากหน่วยงานของรัฐ`
              : `ไม่มีสิทธิเบิกจากหน่วยงานของรัฐ`
          }}
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
        <div class="font-bold">
          ได้รับทุนการศึกษายกเว้นค่า <br />ธรรมเนียมการศึกษา
        </div>
        <div>
          {{
            access.scholarshiptype == 1
              ? ``
              : `ไม่ได้รับทุนการศึกษายกเว้นค่าธรรมเนียมการศึกษา`
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
            access.loantype == 1 ||
            access.loantype == '1' ||
            access.loantype == 2 ||
            access.loantype == '2' ||
            access.loantype == 3 ||
            access.loantype == '3'
              ? `กู้กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.)`
              : `ไม่ได้กู้กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.)`
          }}
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
        <div class="font-bold">หมายเลขอ้างอิงการตรวจสอบ clearing house</div>
        <div>{{ me.id }}</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
        <div class="font-bold">
          การรับรองสิทธิด้วยการเข้าสู่ระบบอิเล็กทรอนิกส์
        </div>
        <div>
          <span>{{ me._id }} {{ me.timestamp }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('access', ['getAccess', 'getStep']),
    ...mapGetters('authen', ['me']),
    access() {
      return {
        right:
          this.getStep.step > 1 || this.me.status != 0
            ? this.me.right
            : this.getAccess.right,
        scholarshiptype:
          this.getStep.step > 1 || this.me.status != 0
            ? this.me.scholarshiptype
            : this.getAccess.scholarshiptype,
        loantype:
          this.getStep.step > 1 || this.me.status != 0
            ? this.me.loantype
            : this.getAccess.loantype,
      }
    },
  },
}
</script>

<style>
</style>