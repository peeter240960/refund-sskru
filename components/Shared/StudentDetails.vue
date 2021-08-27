<template>
  <section class="mb-5 mx-8">
    <p><b>ข้อมูลนักศึกษา</b></p>
    <div class="border p-5" id="student-detail">
      <div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">เลขประจำตัวประชาชน</div>
          <div>{{ me.cid }}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">รหัสนักศึกษา</div>
          <div>{{ me.sid }}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">คำนำหน้า</div>
          <div>{{ me.title }}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">ชื่อ</div>
          <div>{{ me.firstname }}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">นามสกุล</div>
          <div>{{ me.lastname }}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">คณะ</div>
          <div>{{ me.faculty }}</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">หลักสูตร</div>
          <div>{{ me.program }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('authen', ['me']),
  },
}
</script>

<style>
</style>