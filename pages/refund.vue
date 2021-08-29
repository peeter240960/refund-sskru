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
        ด้วยข้าพเจ้า <<คำนำหน้าชื่อ>> <<ชื่อ>> <<นามสกุล>> เลขประจำตัวประชาชน
        <<ประชาชน>> นักศึกษามหาวิทยาลัยราชภัฏศรีสะเกษ สาขาวิชา <<หลักสูตร>> คณะ
        <<คณะ>> อยู่ <<ที่อยู่>>
      </p>
      <p class="text-indent">
        มีความประสงค์ขอรับเงินค่าเล่าเรียนประจำภาคเรียนที่  1/2564 คืน 
        ตามโครงการมาตรการการลดค่าใช้จ่ายด้านการศึกษาของนิสิตนักศึกษาในสถาบันอุดมศึกษาภาครัฐและเอกชน
        เป็นจำนวนเงิน  เงินคืน บาท
      </p>
    </section>

    <section class="mt-5">
      <p class="text-indent">
        ขอรับเงินผ่านระบบ KTB Corporate Online
        โดยได้แนบสำเนาบัตรประจำตัวประชาชนมาเพื่อเป็นหลักฐานด้วยแล้ว *
        ทั้งนี้ต้องเป็นบัญชีที่ผูกกับพร้อมเพย์เลขบัตรประจำตัวประชาชนเท่านั้น
        เพื่อเข้าบัญชี
      </p>
    </section>

    <section class="mx-8 md:mx-20">
      <div class="p-5">
        <div>
          <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
            <div class="font-bold">ธนาคาร</div>
            <div>
              <select class="py-1 px-2 bg-gray-50 rounded w-full">
                <option value="0">เลือก</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
            <div class="font-bold">สาขา</div>
            <div>
              <select class="py-1 px-2 bg-gray-50 rounded w-full">
                <option value="0">เลือก</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
            <div class="font-bold">ประเภท</div>
            <div>
              <select class="py-1 px-2 bg-gray-50 rounded w-full">
                <option value="0">เลือก</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
            <div class="font-bold">เลขที่บัญชีเงินฝากธนาคาร</div>
            <div>
              <input type="text" class="py-1 px-2 bg-gray-50 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="">
      <p>
        และเมื่อมหาวิทยาลัยราชภัฏศรีสะเกษ โอนเงินผ่านระบบ KTB Corporate Online
        แล้ว <br />
        ให้ส่งข้อมูลการโอนเงินผ่านช่องทาง
      </p>
    </section>

    <section class="mt-5 mx-8 md:mx-20">
      <div class="mb-5 grid sm:flex sm:flex-wrap">
        <div>
          <input type="checkbox" /> ข้อความแจ้งเตือนผ่านโทรศัพท์มือถือ (SMS)
          ที่เบอร์โทรศัพท์
        </div>
        <input type="text" class="py-1 px-2 bg-gray-50 rounded sm:ml-1" />
      </div>
      <div class="mb-5 grid sm:flex sm:flex-wrap">
        <div>
          <input type="checkbox" /> จดหมายอิเล็กทรอนิกส์ (e-mail) ตาม e-mail
          address
        </div>
        <input type="text" class="py-1 px-2 bg-gray-50 rounded sm:ml-1" />
      </div>
    </section>

    <section class="mt-5">
      <p class="text-indent">ทั้งนี้ ได้แนบสำเนาบัตรประชาชนมาพร้อมนี้</p>
    </section>

    <section class="mt-5 border p-5">
      <div class="grid mb-3">
        <span>สำเนาบัตรประจำตัวประชาชน</span>
        <div class="flex items-center bg-gray-50 px-2">
          <i class="fas fa-file-upload text-2xl"></i>
          <input type="file" class="py-1 px-2 rounded w-full" />
        </div>
      </div>
    </section>

    <section class="mt-5">
      <button class="px-4 py-2 bg-yellow-400 rounded-lg text-sm mr-3">
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
export default {
  components: {
    StudentDetails,
    SelfCertificate,
    StudyDetails,
    HeadContent,
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