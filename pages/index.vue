<template>
  <div class="px-2 flex items-center justify-center h-screen w-screen">
    <div
      id="card"
      style="max-width: 455px"
      class="mx-auto p-5 bg-white rounded shadow-lg relative mt-10 pb-16"
    >
      <div class="flex justify-center items-center my-3">
        <img src="~/assets/images/MHESI.png" alt="MHUSI" class="h-32 mr-2" />
        <img src="~/assets/images/SSKRU.png" alt="SSKRU" class="h-32" />
      </div>
      <div class="py-10 text-center">
        <b class="text-xl">
          ระบบยืนยันตัวตนเพื่อขอรับสิทธิลดค่าเล่าเรียน ภาคเรียนที่ 1/2564
        </b>
        <br />
        <small>
          ตามโครงการมาตรการลดค่าใช้จ่ายด้านการศึกษาของนิสิตนักศึกษาในสถาบันอุดมศึกษาภาครัฐและเอกชน
        </small>
      </div>
      <form @submit.prevent="submit" class="px-5">
        <div>
          <label for="sid">รหัสนักศึกษา</label>
          <input
            id="sid"
            type="text"
            class="
              mt-1
              block
              bg-red-50
              p-2
              w-full
              border-red-500 border border-2
            "
            v-model="form.sid"
            required
            autofocus
          />
          <small class="text-red-600"><b>Lor</b></small>
        </div>

        <div>
          <label for="cid">รหัสบัตรประชาชน</label>
          <input
            id="cid"
            type="password"
            class="mt-1 block bg-gray-100 p-2 w-full"
            v-model="form.cid"
            required
          />
        </div>

        <div class="flex items-center justify-end mt-4">
          <button class="px-3 py-2 bg-yellow-500 text-white rounded w-full">
            เข้าสู่ระบบ
          </button>
        </div>
      </form>
      <div
        class="
          p-3
          bg-green-50
          border border-green-100
          m-5
          font-light
          text-green-800
        "
      >
        การเข้าใช้งานระบบด้วย Username และ Password
        ของท่านถือว่าเป็นการลงลายมือชื่อทางอิเล็กทรอนิกส์ ตามมาตรา ๙ ของ พ.ร.บ.
        ธุรกรรมทางอิเล็กทรอนิกส์ พ.ศ. ๒๕๔๔
        <br />
        <br />
        <button class="text-blue-600 font-light hover:underline">
          อ่านรายละเอียด
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  layout: 'authLayout',
  data: () => ({
    form: { sid: null, sid: null },
  }),
  methods: {
    submit() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis repellendus optio ducimus dolore praesentium magnam nam? Tempore, a natus. Officia, dolore? Inventore enim doloremque iusto adipisci sit animi minima rem beatae nesciunt repellat, ullam magni fugit possimus, accusantium repudiandae repellendus nulla ab distinctio rerum, sequi delectus autem unde non sunt.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push('unconfirmed')
        }
      })
    },
  },
}
</script>

<style>
</style>