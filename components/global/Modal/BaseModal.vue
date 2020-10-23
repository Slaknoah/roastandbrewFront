<template>
  <div v-show="isModalOpen" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
      <transition
        enter-active-class = "ease-out duration-300"
        enter-class = "opacity-0"
        enter-to-class = "opacity-100"
        leave-active-class = "ease-in duration-200"
        leave-class = "opacity-100"
        leave-to-class = "opacity-0">
        <div v-show="isModalOpen" class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
      </transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="inline-block align-middle h-screen"></span>&#8203;

      <transition
        enter-active-class = "ease-out duration-300"
        enter-class = "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class = "opacity-100 translate-y-0 sm:scale-100"
        leave-active-class = "ease-in duration-200"
        leave-class = "opacity-100 translate-y-0 sm:scale-100"
        leave-to-class = "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="transition-all" v-show="isModalOpen">
            <slot></slot>
          </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
      isModalOpen: false
  }
}
</script>