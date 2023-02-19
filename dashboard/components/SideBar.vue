<template>
  <div class="sidebar min-w-[120px] bg-secondary-dark h-full w-[18%] flex flex-col p-4">
    <div class="logo-container flex justify-between items-center">
        <div class="logo-wrapper flex gap-2">
          <IconLogo></IconLogo>
          <div class="text-wrapper flex flex-col">
            <h1 class="text-white text-xl font-semibold">Smartix <span class="font-normal">Aio</span>
            </h1>
            <h3 class="text-secondary-gray text-sm">version 1.0.0 beta</h3>
          </div>
          
        </div>
        <div class="notofoication-wrapper relative">
            <IconBell></IconBell>
            <div class="crile rounded-full h-2 w-2 bg-primary-default top-0 left-0 translate-x-4 -translate-y-6">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>