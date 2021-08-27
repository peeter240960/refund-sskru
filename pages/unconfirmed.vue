<template>
  <div
    id="card"
    class="p-5 md:p-10 bg-white shadow-lg mx-auto text-sm md:text-lg"
    style="max-width: 1024px"
  >
    <section class="text-center mb-5">
      <b>
        แบบยืนยันตัวตนเพื่อขอรับสิทธิ์ลดค่าเล่าเรียน ภาคเรียนที่ 1 /2564
        มหาวิทยาลัยราชภัฏศรีสะเกษ <br />
        ตามโครงการมาตรการการลดค่าใช้จ่ายด้านการศึกษาของนิสิตนักศึกษาในสถาบันอุดมศึกษาภาครัฐและเอกชน
      </b>
    </section>
    <section class="mb-5">
      <p class="text-indent">
        ด้วยการยืนยันตัวตนผ่านระบบอิเล็กทรอนิกส์ของมหาวิทยาลัยราชภัฏศรีสะเกษ
        ข้าพเจ้าขอรับรองว่า ข้าพเจ้าเป็นผู้กระทำการยืนยันตัวตน
        และยืนยันสิทธิ์นี้ด้วยตัวข้าพเจ้าเอง
      </p>
    </section>
    <student-details />
    <section class="mb-5 mx-8">
      <p><b>ข้อมูลการชำระค่าธรรมเนียมการศึกษา</b></p>
      <div class="border p-5" id="unconfirm">
        <div>
          <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
            <div class="font-bold">ค่าธรรมเนียมการศึกษา</div>
            <div></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
            <div class="font-bold">
              ค่าธรรมเนียมการศึกษาแรกเข้า <br />
              (ค่าขึ้นทะเบียนนักศึกษาใหม่)
            </div>
            <div></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
            <div class="font-bold">สถานะ</div>
            <div></div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-5 mx-8">
      <p><b>การรับรองสิทธิตนเอง</b></p>
      <div class="border p-5" id="self">
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">มีสิทธิเบิกจากหน่วยงานของรัฐ</div>
          <div>
            <ul>
              <li>
                <input
                  type="radio"
                  name="have"
                  v-model="getAccess.have"
                  id="have"
                  value="have"
                  @change="setAccess({ have: 'have' })"
                />
                <label for="have">มีสิทธิเบิกจากหน่วยงานของรัฐ</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="have"
                  v-model="getAccess.have"
                  id="nohave"
                  value="nohave"
                  @change="setAccess({ have: 'nohave' })"
                />
                <label for="nohave"> ไม่มีสิทธิเบิกจากหน่วยงานของรัฐ </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">
            ได้รับทุนการศึกษายกเว้นค่า <br />ธรรมเนียมการศึกษา
          </div>
          <div>
            <ul>
              <li>
                <input
                  type="radio"
                  name="funded"
                  v-model="getAccess.funded"
                  id="funded"
                  value="funded"
                  @change="setAccess({ funded: 'funded' })"
                />
                <label for="funded">
                  ได้รับทุนการศึกษายกเว้นค่าธรรมเนียมการศึกษา
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  name="funded"
                  v-model="getAccess.funded"
                  id="nofunded"
                  value="nofunded"
                  @change="setAccess({ funded: 'nofunded' })"
                />
                <label for="nofunded">
                  ไม่ได้รับทุนการศึกษายกเว้นค่าธรรมเนียมการศึกษา
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mb-3">
          <div class="font-bold">
            กองทุนเงินให้กู้ยืมเพื่อการศึกษา <br />
            (กยศ.)
          </div>
          <div>
            <ul>
              <li>
                <input
                  name="loan"
                  v-model="getAccess.loan"
                  type="radio"
                  id="loan"
                  value="loan"
                  @change="setAccess({ loan: 'loan' })"
                />
                <label for="loan">
                  กู้กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.)
                </label>
              </li>
              <li>
                <input
                  name="loan"
                  v-model="getAccess.loan"
                  type="radio"
                  id="noloan"
                  value="noloan"
                  @change="setAccess({ loan: 'noloan' })"
                />
                <label for="noloan">
                  ไม่ได้กู้กองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ.)
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="mb-5">
      <p class="text-indent">
        <b>
          ข้าพเจ้าขอรับรองว่าข้อมูลข้างต้นเป็นจริงทุกประการ
          โดยข้าพเจ้าขอแสดงความประสงค์ดังนี้
        </b>
      </p>
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-1 flex justify-center items-center">
          <font-awesome-icon
            :icon="['fa', 'check-circle']"
            :class="`text-5xl shadow-lg rounded-full text-${
              getAccess.access === 'access'
                ? `green-600 border-2 border-green-800`
                : 'gray-300'
            }`"
            style="cursor: pointer"
            @click="setAccess({ access: 'access' })"
          />
          <input
            type="radio"
            name="status_request"
            id="request"
            value="access"
            class="opacity-0"
          />
        </div>
        <label for="request" class="col-span-11">
          ข้าพเจ้าขอ
          <b class="underline">ยืนยันสิทธิ์รับส่วนลด </b>
          ค่าธรรมเนียมการศึกษาสถาบันอุดมศึกษาของรัฐ
          ตามมาตรการการลดภาระค่าใช้จ่ายด้านการศึกษาของนิสิตนักศึกษาในสถาบันอุดมศึกษาภาครัฐและเอกชน
          ของกระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม ในภาคเรียนที่
          1/2564 ตามมติคณะรัฐมนตรี
          และในการนี้ข้าพเจ้ายินยอมให้มหาวิทยาลัย/สถาบัน
          รับเงินที่ภาครัฐสนับสนุน แทนข้าพเจ้าในส่วนที่ข้าพเจ้าพึงได้รับ
          และออกหลักฐานการรับเงินเพื่อเป็นหลักฐานแก่สำนักบริหารหนี้สาธารณะในนามข้าพเจ้า
          และสำหรับการตรวจสอบจากหน่วยงานที่เกี่ยวข้องต่อไป
        </label>
        <div class="col-span-1 flex justify-center items-center">
          <font-awesome-icon
            :icon="['fa', 'times-circle']"
            :class="`text-5xl shadow-lg rounded-full text-${
              getAccess.access === 'noaccess'
                ? `red-600 border-2 border-red-800`
                : 'gray-300'
            }`"
            style="cursor: pointer"
            @click="setAccess({ access: 'noaccess' })"
          />
          <input
            type="radio"
            name="status_request"
            id="norequest"
            value="noaccess"
            class="opacity-0"
          />
        </div>
        <label for="norequest" class="col-span-11">
          ข้าพเจ้า
          <b class="underline">ไม่ขอรับส่วนลด</b>
          ค่าเล่าเรียนและค่าธรรมเนียมการศึกษาสถาบันอุดมศึกษาของรัฐ
          ของกระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม ในภาคเรียนที่
          1/2564
        </label>
      </div>
    </section>
    <section class="mb-5">
      <p class="text-indent">
        นักศึกษาโปรดตรวจสอบข้อมูลของท่านก่อนยืนยันการบันทึก
        ก่อนยื่นความประสงค์ขอรับการเยียวยา หากมีรายการในข้อใดไม่ถูกต้อง
        หรือต้องการเปลี่ยนแปลงข้อมูลโปรดติดต่อสำนักส่งเสริมและบริการวิชาการ
      </p>
    </section>
    <section>
      <button
        @click="submit"
        class="px-4 py-2 bg-yellow-400 rounded-lg text-sm"
      >
        ยื่นความประสงค์
      </button>
    </section>
  </div>
</template>

<script>
import SelfCertificate from '~/components/Shared/SelfCertificate.vue'
import StudentDetails from '~/components/Shared/StudentDetails.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  components: { SelfCertificate, StudentDetails },
  data: () => ({
    from: {
      access: 'access',
    },
  }),
  fetch() {
    this.getMe()
  },
  computed: {
    ...mapGetters('access', ['getAccess']),
  },
  methods: {
    ...mapMutations('access', ['setAccess', 'setStep']),
    ...mapActions('access', ['getMe']),
    submit() {
      this.setStep(2)
      this.$router.push('confirme')
    },
  },
}
</script>

<style>
</style>