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
          :class="`${loading ? 'opacity-40' : 'opacity-100'}
          px-3
          py-2
          bg-yellow-500
          text-white text-sm
          uppercase
          rounded-lg
          shadow-lg
          mb-3
          hover:bg-yellow-600`"
          :disabled="loading"
          @click="dialog = true"
        >
          import
        </button>
        <button
          :class="`${loadingExport ? 'opacity-40' : 'opacity-100'}
          px-3
          py-2
          bg-green-500
          text-white text-sm
          uppercase
          rounded-lg
          shadow-lg
          mb-3
          hover:bg-green-600`"
          :disabled="loadingExport"
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
              title
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              firstname
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              lastname
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              faculty
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              program
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              loantype
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              scholarshiptype
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              scholarship
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              tuitionfee
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              cidvalid
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              ciddup
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              prefer
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              level
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              confirm
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              right
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              regisfee
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              entfee
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              govdiscount
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              unidiscount
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              discount
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              tuitionbalance
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              paidtype
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              paid
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              refund
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              timestamp
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              confirmlog
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              macaddress
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              status
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              address
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              bookbank
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              bank
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              branch
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              bookbanktype
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              role
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              tel
            </th>
            <th class="px-3 border py-2 text-left" style="min-width: 200px">
              email
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
            <td class="p-2">{{ item.title }}</td>
            <td class="p-2">{{ item.firstname }}</td>
            <td class="p-2">{{ item.lastname }}</td>
            <td class="p-2">{{ item.faculty }}</td>
            <td class="p-2">{{ item.program }}</td>
            <td class="p-2">{{ item.loantype }}</td>
            <td class="p-2">{{ item.scholarshiptype }}</td>
            <td class="p-2">{{ item.scholarship }}</td>
            <td class="p-2">{{ item.tuitionfee }}</td>
            <td class="p-2">{{ item.cidvalid }}</td>
            <td class="p-2">{{ item.ciddup }}</td>
            <td class="p-2">{{ item.prefer }}</td>
            <td class="p-2">{{ item.level }}</td>
            <td class="p-2">{{ item.confirm }}</td>
            <td class="p-2">{{ item.right }}</td>
            <td class="p-2">{{ item.regisfee }}</td>
            <td class="p-2">{{ item.entfee }}</td>
            <td class="p-2">{{ item.govdiscount }}</td>
            <td class="p-2">{{ item.unidiscount }}</td>
            <td class="p-2">{{ item.discount }}</td>
            <td class="p-2">{{ item.tuitionbalance }}</td>
            <td class="p-2">{{ item.paidtype }}</td>
            <td class="p-2">{{ item.paid }}</td>
            <td class="p-2">{{ item.refund }}</td>
            <td class="p-2">{{ item.timestamp }}</td>
            <td class="p-2">{{ item.confirmlog }}</td>
            <td class="p-2">{{ item.macaddress }}</td>
            <td class="p-2">{{ item.status }}</td>
            <td class="p-2">{{ item.address }}</td>
            <td class="p-2">{{ item.bookbank }}</td>
            <td class="p-2">{{ item.bank }}</td>
            <td class="p-2">{{ item.branch }}</td>
            <td class="p-2">{{ item.bookbanktype }}</td>
            <td class="p-2">{{ item.role }}</td>
            <td class="p-2">{{ item.tel }}</td>
            <td class="p-2">{{ item.email }}</td>
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
            <b class="text-sm uppercase text-gray-600">title</b>
            <input
              type="text"
              name="title"
              id="title"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.title"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">firstname</b>
            <input
              type="text"
              name="firstname"
              id="firstname"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.firstname"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">lastname</b>
            <input
              type="text"
              name="lastname"
              id="lastname"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.lastname"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">faculty</b>
            <input
              type="text"
              name="faculty"
              id="faculty"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.faculty"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">program</b>
            <input
              type="text"
              name="program"
              id="program"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.program"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">loantype</b>
            <input
              type="text"
              name="loantype"
              id="loantype"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.loantype"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">scholarshiptype</b>
            <input
              type="text"
              name="scholarshiptype"
              id="scholarshiptype"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.scholarshiptype"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">scholarship</b>
            <input
              type="text"
              name="scholarship"
              id="scholarship"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.scholarship"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">tuitionfee</b>
            <input
              type="text"
              name="tuitionfee"
              id="tuitionfee"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.tuitionfee"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">cidvalid</b>
            <input
              type="text"
              name="cidvalid"
              id="cidvalid"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.cidvalid"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">ciddup</b>
            <input
              type="text"
              name="ciddup"
              id="ciddup"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.ciddup"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">prefer</b>
            <input
              type="text"
              name="prefer"
              id="prefer"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.prefer"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">level</b>
            <input
              type="text"
              name="level"
              id="level"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.level"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">confirm</b>
            <input
              type="text"
              name="confirm"
              id="confirm"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.confirm"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">right</b>
            <input
              type="text"
              name="right"
              id="right"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.right"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">regisfee</b>
            <input
              type="text"
              name="regisfee"
              id="regisfee"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.regisfee"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">entfee</b>
            <input
              type="text"
              name="entfee"
              id="entfee"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.entfee"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">govdiscount</b>
            <input
              type="text"
              name="govdiscount"
              id="govdiscount"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.govdiscount"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">unidiscount</b>
            <input
              type="text"
              name="unidiscount"
              id="unidiscount"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.unidiscount"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">discount</b>
            <input
              type="text"
              name="discount"
              id="discount"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.discount"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">tuitionbalance</b>
            <input
              type="text"
              name="tuitionbalance"
              id="tuitionbalance"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.tuitionbalance"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">paidtype</b>
            <input
              type="text"
              name="paidtype"
              id="paidtype"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.paidtype"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">paid</b>
            <input
              type="text"
              name="paid"
              id="paid"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.paid"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">refund</b>
            <input
              type="text"
              name="refund"
              id="refund"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.refund"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">timestamp</b>
            <input
              type="text"
              name="timestamp"
              id="timestamp"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.timestamp"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">confirmlog</b>
            <input
              type="text"
              name="confirmlog"
              id="confirmlog"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.confirmlog"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">macaddress</b>
            <input
              type="text"
              name="macaddress"
              id="macaddress"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.macaddress"
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
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">address</b>
            <input
              type="text"
              name="address"
              id="address"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.address"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">bookbank</b>
            <input
              type="text"
              name="bookbank"
              id="bookbank"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.bookbank"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">bank</b>
            <input
              type="text"
              name="bank"
              id="bank"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.bank"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">branch</b>
            <input
              type="text"
              name="branch"
              id="branch"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.branch"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">bookbanktype</b>
            <input
              type="text"
              name="bookbanktype"
              id="bookbanktype"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.bookbanktype"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">role</b>
            <input
              type="text"
              name="role"
              id="role"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.role"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">tel</b>
            <input
              type="text"
              name="tel"
              id="tel"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.tel"
            />
          </div>
          <div class="mt">
            <b class="text-sm uppercase text-gray-600">email</b>
            <input
              type="text"
              name="email"
              id="email"
              class="py-1 px-3 bg-gray-100 w-full"
              v-model="form.email"
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
            :disabled="loading"
            :class="`px-3 py-2 rounded-lg bg-yellow-500 text-white ${
              loading ? 'opacity-25' : 'opacity-100'
            }`"
            @click="importSubmit"
          >
            Import
          </button>
          <button
            :disabled="loading"
            @click="dialog = false"
            :class="`px-3 py-2 rounded-lg bg-red-500 text-white ${
              loading ? 'opacity-25' : 'opacity-100'
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
          title: 'Oops...',
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
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
      this.file = event.target.files ? event.target.files[0] : null
      this.toJson(this.file).then((data) => {
        data.forEach((element, index) => {
          this.userData.push({
            id: element.id,
            cid: element.cid,
            sid: element.sid,
            title: element.title,
            firstname: element.firstname,
            lastname: element.lastname,
            faculty: element.faculty,
            program: element.program,
            loantype: element.loantype,
            scholarshiptype: element.scholarshiptype,
            scholarship: element.scholarship,
            tuitionfee: element.tuitionfee,
            cidvalid: element.cidvalid,
            ciddup: element.ciddup,
            prefer: element.prefer,
            level: element.level,
            confirm: element.confirm,
            right: element.right,
            regisfee: element.regisfee,
            entfee: element.entfee,
            govdiscount: element.govdiscount,
            unidiscount: element.unidiscount,
            discount: element.discount,
            tuitionbalance: element.tuitionbalance,
            paidtype: element.paidtype,
            paid: element.paid,
            refund: element.refund,
            timestamp: element.timestamp,
            confirmlog: element.confirmlog,
            macaddress: element.macaddress,
            status: element.status,
            address: element.address,
            bookbank: element.bookbank,
            bank: element.bank,
            branch: element.branch,
            bookbanktype: element.bookbanktype,
            role: element.role,
            tel: element.tel,
            email: element.email,
          })
        })
      })
    },
    async importSubmit() {
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
          title: 'Oops...',
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
