<template>
  <div class="flex items-center justify-center">
      <div class="flex flex-col my-16 items-center" v-if="error.statusCode == 404">
          <img src="/img/ui/404.svg" class="mb-5 pointer-events-none"/>
          <span class="text-black-900 text-2xl font-bold text-center md:text-3xl lg:text-5xl">404 - Page Not Found</span>
          <span class="text-gray-700 text-xl text-center md:text-2xl lg:text-3xl">We know you’re looking for coffee, but unfortunately you will not find it here.</span>

          <nuxt-link to="/" class="rounded bg-green-600 py-3 px-8 text-white text-base uppercase text-center mt-5">Find More Coffee</nuxt-link>
      </div>

      <div class="flex flex-col my-16 items-center" v-else-if="error.statusCode == 403">
          <img src="/img/ui/coffee-to-go.svg" class="mb-5 pointer-events-none"/>
          <span class="text-black-900 text-2xl font-bold text-center md:text-3xl lg:text-5xl">403 - Sorry this action is not allowed</span>
          <span class="text-gray-700 text-xl text-center md:text-2xl lg:text-3xl">What you are trying to do is not allowed for your user type please consider upgrading.</span>

          <nuxt-link to="/" class="rounded bg-green-600 py-3 px-8 text-white text-base uppercase text-center mt-5">Home</nuxt-link>
      </div>

      <div class="flex flex-col my-16" v-else>
          <h1 class="font-bold text-4xl text-center">An error occured</h1>
          <h2 class="text-2xl text-center mt-2">Spilled your coffee?</h2>

          <img src="/img/ui/coffee-to-go.svg" class="pointer-events-none"/>
          <p class="text-base text-center mb-5">Don't worry, we can help you find more!</p>

          <nuxt-link to="/" class="rounded bg-green-600 py-3 px-8 text-white text-base uppercase text-center">Home</nuxt-link>
      </div>
  </div>
</template>

<script>
export default {
  props: [ 'error' ],
  layout: 'App'
}
</script>