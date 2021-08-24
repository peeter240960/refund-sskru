<template>
  <div>
    <header class="bg-white p-5 pb-0 shadow-lg top-0">
      <div class="mx-auto" style="max-width: 1024px">
        <b>
          <p class="text-lg md:text-2xl">
            ระบบยืนยันตัวตนเพื่อขอรับสิทธิลดค่าเล่าเรียน ภาคเรียนที่ 1/2564
          </p>
          <small class="text-sm md:text-lg">มหาวิทยาลัยราชภัฏศรีสะเกษ</small>
        </b>
        <div
          class="
            grid
            sm:flex
            items-center
            justify-center
            sm:justify-start
            mt-8
            text-center
          "
        >
          <nuxt-link class="py-1 mr-5" to="unconfirmed">
            <span :class="$route.path === '/unconfirmed' && 'font-bold'">
              ตรวจสอบข้อมูล
            </span>
          </nuxt-link>
          <nuxt-link class="py-1 mr-5" to="confirme">
            <span :class="$route.path === '/confirme' && 'font-bold'">
              ยืนยันสิทธิ์
            </span>
          </nuxt-link>
          <nuxt-link class="py-1 mr-5" to="confirmed">
            <span :class="$route.path === '/confirmed' && 'font-bold'">
              พิมพ์ใบลงทะเบียน
            </span>
          </nuxt-link>
          <nuxt-link class="py-1 mr-5" to="refund">
            <span :class="$route.path === '/refund' && 'font-bold'">
              ขอเงินคืน
            </span>
          </nuxt-link>
          <button class="pb-2 pt-5 sm:hidden">
            <span @click="logout"> ออกจากระบบ </span>
          </button>
          <!-- <i class="fas fa-chevron-down"></i> -->
          <div
            class="icon ml-auto relative hidden sm:block"
            style="cursor: pointer"
            @click="show = !show"
          >
            <font-awesome-icon :icon="['fa', 'chevron-down']" />
            <div
              v-if="show"
              id="content"
              class="
                p-3
                rounded-lg
                border
                shadow-lg
                absolute
                right-0
                bg-white
                w-44
              "
            >
              <button
                class="z-50 w-full h-full py-1 hover:bg-gray-100"
                @click="logout"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
          <!-- <dropdown
            class="
              ml-auto
              hidden
              sm:block
              cursor-pointer
              hover:bg-gray-100
              px-2
              rounded-full
            "
          >
            <template #trigger> <i class="fas fa-chevron-down"></i> </template>
            <template #content>
              <dropdown-link @click="logout"> ออกจากระบบ </dropdown-link>
            </template>
          </dropdown> -->
        </div>
      </div>
    </header>
    <main class="px-2 py-5" id="defaultLayout">
      <nuxt />
    </main>
  </div>
</template>
<script>
export default {
  data: () => ({
    show: false,
  }),
  methods: {
    logout() {
      console.log('logout')
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
#defaultLayout {
  /* background: url('~/static/images/bg.jpg'); */
  background: #efefef;
}
</style>