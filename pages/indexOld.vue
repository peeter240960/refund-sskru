<template>
  <div class="flex text-center h-screen justify-center">
    <div class="my-36">
      <div class="flex justify-center items-center my-3">
        <img src="~/assets/images/MHESI.png" alt="MHUSI" class="h-32" />
        <img src="~/assets/images/SSKRU.png" alt="SSKRU" class="h-32" />
      </div>
      <p class="text-4xl">
        ระบบลงทะเบียนเงินช่วยเหลือนักศึกษา <br />
        (COVID-19 Relief Fund for Students)
      </p>
      <p class="text-2xl">มหาวิทยาลัยราชภัฏศรีสะเกษ</p>
      <div class="mt-5">
        <nuxt-link
          to="login"
          class="rounded-lg py-3 bg-yellow-500 text-white px-8"
        >
          เข้าสู่ระบบ
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'homeLayout',
}
</script>
<style>
body {
  background: #eee;
}
</style>
