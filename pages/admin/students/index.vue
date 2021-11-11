<template>
  <div
    id="card"
    class="p-5 md:p-10 bg-white shadow-lg mx-auto text-sm md:text-lg"
    style="max-width: 1024px"
  >
    <div class="relative pt-1" v-if="serverProcessed < 100">
      <div class="text-right">
        <b class="text-xs">{{ serverProcessed.toFixed(2) }} %</b>
      </div>
      <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
        <div
          :style="`width: ${serverProcessed}%`"
          class="
            shadow-none
            flex flex-col
            text-center
            whitespace-nowrap
            text-white
            justify-center
            bg-pink-500
          "
        ></div>
      </div>
    </div>
    <section>
      <div>
        <button
          :class="`${loading || loadingPage ? 'opacity-40' : 'opacity-100'}
          px-3
          py-2
          bg-yellow-500
          text-white text-sm
          uppercase
          rounded-lg
          shadow-lg
          mb-3
          hover:bg-yellow-600`"
          :disabled="loading || loadingPage"
          @click="dialog = true"
        >
          import
        </button>
        <button
          :class="`${
            loadingExport || loadingPage ? 'opacity-40' : 'opacity-100'
          }
          px-3
          py-2
          bg-green-500
          text-white text-sm
          uppercase
          rounded-lg
          shadow-lg
          mb-3
          hover:bg-green-600`"
          :disabled="loadingExport || loadingPage"
          @click="exportFile"
        >
          export
        </button>
      </div>
      <div>
        <input
          type="text"
          name="id"
          id="id"
          class="py-1 px-3 bg-gray-100 w-full"
          placeholder="ค้นหาด้วยรหัสนักศึกษา.."
          v-model="searchText"
        />
      </div>
    </section>

    <section class="text-sm my-3 flex justify-between">
      <div>
        <button
          v-if="data.hasPrevPage"
          class="hover:underline hover:text-blue-500"
          @click="currentPage = currentPage - 1"
        >
          Prev
        </button>
        <span class="text-gray-600">{{ data.page }} </span>
        <button
          v-if="data.hasNextPage"
          class="hover:underline hover:text-blue-500"
          @click="currentPage = currentPage + 1"
        >
          Next
        </button>
      </div>
      <div>
        <span>Total:{{ data.totalDocs }} </span>
      </div>
    </section>

    <div class="w-full overflow-x-scroll">
      <table>
        <thead>
          <tr class="bg-gray-100 uppercase text-sm">
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              id
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              cid
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              sid
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              status
            </th>
            <th
              class="sticky right-0 bg-white border border-b-0"
              style="min-width: 120px"
            >
              จัดการ
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in data.docs"
            :key="item.id"
            class="border-2 border-b-2"
          >
            <td class="p-2">{{ item.id }}</td>
            <td class="p-2">{{ item.cid }}</td>
            <td class="p-2">{{ item.sid }}</td>
            <td class="p-2">{{ item.status }}</td>
            <td
              class="
                sticky
                right-0
                bg-white
                border border-b-0
                text-center
                bg-gray-100
              "
              style="min-width: 120px"
            >
              <button @click="edit(item)">แก้ไข</button>
            </td>
          </tr>
          <tr v-if="data.docs.length < 1">
            <td class="py-4">ไม่มีข้อมูล</td>
          </tr>
        </tbody>
      </table>
    </div>
    <section class="text-sm my-3 flex justify-between">
      <div>
        <button
          v-if="data.hasPrevPage"
          class="hover:underline hover:text-blue-500"
          @click="currentPage = currentPage - 1"
        >
          Prev
        </button>
        <span class="text-gray-600">{{ data.page }} </span>
        <button
          v-if="data.hasNextPage"
          class="hover:underline hover:text-blue-500"
          @click="currentPage = currentPage + 1"
        >
          Next
        </button>
      </div>
      <div>
        <span>Total:{{ data.totalDocs }} </span>
      </div>
    </section>

    <!-- update dialog -->
    <div
      v-if="dialogUpdate"
      id="dialogUpdate"
      class="
        scale-0 scale-100
        w-screen
        h-screen
        fixed
        left-0
        top-0
        flex
        justify-center
        items-center
        z-40
        bg-black bg-opacity-20
      "
    >
      <div
        class="
          bg-white
          shadow-lg
          p-5
          border
          absolute
          z-50
          rounded-xl
          overflow-y-scroll
        "
        style="max-width: 450px; width: 100%; max-height: 80vh"
      >
        <header>
          <b>Update</b>
        </header>
        <div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">id</b>
            <input
              type="text"
              name="id"
              id="id"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.id"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">cid</b>
            <input
              type="text"
              name="cid"
              id="cid"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.cid"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">sid</b>
            <input
              type="text"
              name="sid"
              id="sid"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.sid"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">status</b>
            <input
              type="text"
              name="status"
              id="status"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.status"
            />
          </div>
        </div>
        <div class="mt-5 text-sm">
          <button
            :disabled="loading"
            :class="`px-3 py-2 rounded-lg bg-yellow-500 text-white ${
              loading ? 'opacity-25' : 'opacity-100'
            }`"
            @click="updateSubmit"
          >
            Update
          </button>
          <button
            :disabled="loading"
            @click="cancelUpdate"
            :class="`px-3 py-2 rounded-lg bg-red-500 text-white ${
              loading ? 'opacity-25' : 'opacity-100'
            }`"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- import dialog -->
    <div
      v-if="dialog"
      id="dialog"
      class="
        scale-0 scale-100
        w-screen
        h-screen
        fixed
        left-0
        top-0
        flex
        justify-center
        items-center
        z-40
        bg-black bg-opacity-20
      "
    >
      <div
        class="bg-white shadow-lg p-5 border absolute z-50 rounded-xl"
        style="max-width: 450px; width: 100%"
      >
        <header>
          <b>Import</b>
        </header>
        <div class="mt-5">
          <input
            type="file"
            name="import"
            id="import"
            class="py-1 px-3 bg-gray-100 w-full"
            @change="importChange"
          />
        </div>
        <div class="mt-5 text-sm">
          <button
            :disabled="loadingPage"
            :class="`px-3 py-2 rounded-lg bg-yellow-500 text-white ${
              loadingPage ? 'opacity-25' : 'opacity-100'
            }`"
            @click="importSubmit"
          >
            Import
          </button>
          <button
            :disabled="loadingPage"
            @click="dialog = false"
            :class="`px-3 py-2 rounded-lg bg-red-500 text-white ${
              loadingPage ? 'opacity-25' : 'opacity-100'
            }`"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import Swal from 'sweetalert2'
export default {
  middleware: 'admin',
  data: () => ({
    data: {
      docs: [],
    },
    dialog: false,
    dialogUpdate: false,
    file: null,
    userData: [],
    loading: false,
    currentPage: 1,
    serverProcessed: 100,
    intervalServerProcess: null,
    loadingExport: false,
    form: {},
    searchText: '',
    timer: null,
    loadingPage: false,
  }),
  async fetch() {
    try {
      const data = await this.$axios.$get(
        '/api/get_server_process?type=import_student'
      )
      this.loading = data.result.active
      this.serverProcessed = (data.result.current / data.result.max) * 100
      if (data.result.active === false || this.serverProcessed === 100) {
        clearInterval(this.intervalServerProcess)
        console.log('interval --> ' + this.intervalServerProcess)
        this.intervalServerProcess = null
      }
    } catch (err) {
      this.loading = false
    }
    await this.getStudents(1)
  },
  watch: {
    loading(val) {
      if (val) {
        this.intervalServerProcess = setInterval(async () => {
          try {
            this.loading = true
            const data = await this.$axios.$get(
              '/api/get_server_process?type=import_student'
            )
            this.loading = data.result.active
            this.serverProcessed = (data.result.current / data.result.max) * 100
            if (data.result.active === false || this.serverProcessed === 100) {
              clearInterval(this.intervalServerProcess)
              console.log('interval --> ' + this.intervalServerProcess)
              this.intervalServerProcess = null
            }
          } catch (err) {
            this.loading = false
          }
        }, 1000)
      } else {
        Swal.fire('Good job!', 'Update student data!', 'success')
        this.loading = false
        this.loadingPage = false
        console.log('Destroyed interval -->', this.intervalServerProcess)
        clearInterval(this.intervalServerProcess)
        this.intervalServerProcess = null
        this.getStudents(1)
      }
    },
    currentPage(val) {
      this.getStudents(val)
    },
    searchText(val) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        this.getStudents(1, val)
      }, 1000)
    },
  },
  methods: {
    cancelUpdate() {
      this.dialogUpdate = false
      this.getStudents(1)
    },
    async updateSubmit() {
      try {
        await this.$axios.$post('/api/admin/student_create', {
          students: [this.form],
        })
        this.dialogUpdate = false
        this.loading = true
      } catch (err) {
        this.loading = false
        console.log('create user failed')
        Swal.fire({
          icon: 'error',
          text: err?.response?.data?.message,
        })
      }
    },
    edit(item) {
      this.form = item
      this.dialogUpdate = true
    },
    async getStudents(page, text) {
      const term = text ? text : ''
      try {
        const resp = await this.$axios.$get(
          '/api/admin/students?page=' + page + '&term=' + term
        )
        this.data = resp.result
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          text: err?.response?.data?.message,
        })
      }
    },
    toJson(fileUpload) {
      return new Promise((resolve, reject) => {
        const f = fileUpload
        const reader = new FileReader()
        reader.onload = function (e) {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          /* DO SOMETHING WITH workbook HERE */
          const worksheet = workbook.Sheets[sheetName]
          resolve(XLSX.utils.sheet_to_json(worksheet))
        }
        reader.readAsArrayBuffer(f)
      })
    },
    importChange(event) {
      this.loadingPage = true
      this.file = event.target.files ? event.target.files[0] : null
      this.toJson(this.file).then((data) => {
        data.forEach((element, index) => {
          this.userData.push({
            id: element.id,
            cid: element.cid,
            sid: element.sid,
            status: element.status,
          })
        })
        this.loadingPage = false
      })
    },
    async importSubmit() {
      this.loadingPage = true
      if (this.userData.length == 0) return false
      try {
        await this.$axios.$post('/api/admin/student_create', {
          students: this.userData,
        })
        this.dialog = false
        this.loading = true
      } catch (err) {
        this.loading = false
        console.log('create user failed')
        Swal.fire({
          icon: 'error',
          text: err?.response?.data?.message,
        })
      }
    },
    async getUserExportData() {
      const data = await this.$axios.$get('/api/admin/students?page=' + 0)
      console.log(data)
      if (data.result.length > 0) {
        return data.result
      } else {
        return []
      }
    },
    exportFile() {
      this.loadingExport = true
      this.getUserExportData().then((exportList) => {
        this.loadingExport = false
        const dataWS = XLSX.utils.json_to_sheet(exportList)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, dataWS)
        XLSX.writeFile(wb, 'student.xlsx')
      })
    },
  },
}
</script>
