<template>
  <section class="mb-5 mx-8">
    <p><b>รายละเอียดการลดค่าเล่าเรียน</b></p>
    <div class="border p-5" id="study-details">
      <div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">ค่าธรรมเนียมการศึกษา</div>
          <div>{{ me.regisfee }}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">
            ค่าธรรมเนียมการศึกษาแรกเข้า <br />(ค่าขึ้นทะเบียนนักศึกษาใหม่)
          </div>
          <div>{{ me.entfee }}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">รวมค่าเล่าเรียน</div>
          <div>{{ parseInt(me.regisfee) + parseInt(me.entfee) }}</div>
        </div>
        <hr class="mb-2" />
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">ส่วนลดของรัฐบาล</div>
          <div>{{ getAccess.access == 1 ? me.govdiscount : 0 }}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">ส่วนลดของมหาวิทยาลัยราชภัฏศรีสะเกษ</div>
          <div>{{ getAccess.access == 1 ? me.unidiscount : 0 }}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">รวมส่วนลดทั้งหมด</div>
          <div>
            {{
              getAccess.access == 1
                ? parseInt(me.govdiscount) + parseInt(me.unidiscount)
                : 0
            }}
          </div>
        </div>
        <hr class="mb-2" />
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">ชำระค่าเทอมแล้ว</div>
          <div>{{ me.paid }}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">
            {{
              getAccess.access == 1 && me.paidtype == 1
                ? 'ได้รับคืนค่าเทอม'
                : 'ค้างชำระค่าเทอม'
            }}
          </div>
          <div>
            {{
              getAccess.access == 1
                ? me.refund
                : me.paidtype == 0
                ? parseInt(me.regisfee) + parseInt(me.entfee)
                : 0
            }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters('access', ['getAccess']),
    ...mapGetters('authen', ['me']),
  },
  mounted() {
    if (this.me.confirm != 0) {
      this.setAccess({
        access: this.me.confirm,
      })
    }
  },
  methods: {
    ...mapMutations('access', ['setAccess']),
  },
}
</script>

<style>
</style>