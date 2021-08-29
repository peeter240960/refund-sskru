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
          <div>{{ me.govdiscount }}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">ส่วนลดของมหาวิทยาลัยราชภัฏศรีสะเกษ</div>
          <div>{{ me.unidiscount }}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">รวมส่วนลดทั้งหมด</div>
          <div>{{ parseInt(me.govdiscount) + parseInt(me.unidiscount) }}</div>
        </div>
        <hr class="mb-2" />
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">ค่าเล่าเรียนที่ต้องชำระ</div>
          <div>
            {{ me.tuitionbalance }}
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">ชำระค่าเทอมแล้ว</div>
          <div>{{ me.paidtype == 1 ? 'ชำระค่าเทอมแล้ว' : 'ยังไม่ชำระ' }}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">
            {{ me.paidtype == 1 ? `เงินค่าเทอมคืน` : `ค่าเทอมที่ต้องชำระ` }}
          </div>
          <div>
            {{ me.paidtype == 1 ? me.refund : me.tuitionbalance }}
          </div>
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