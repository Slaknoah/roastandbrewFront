<template>
  <div v-if="cafe && cafe.company">
    <div class="w-full bg-cover bg-center h-56.25 md:h-72 lg:h-125" :style="'background-image: url(' + cafe.primary_image_url + ')'"></div>
    <div class="flex flex-col pb-10 md:pt-10 pt-5 w-full mx-auto max-w-screen-xl">
      <div v-if="$auth.loggedIn" class="mb-5 flex justify-end px-4 sm:px-6 lg:ml-4 lg:flex-row">
        <span class="shadow-sm rounded-md mr-2" >
          <nuxt-link :to="'/companies/' + cafe.company.slug + '/cafes/' + cafe.slug + '/edit'" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
            <svg class="sm:-ml-1 sm:mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            <span class="hidden sm:block">Изменить</span>
          </nuxt-link>
        </span>

        <span class="shadow-sm rounded-md">
          <a @click.prevent="deleteCafe" href="#" class="inline-flex items-center px-4 py-2 border border-red-400 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:border-red-500 focus:outline-none focus:shadow-outline-red focus:border-red-300 active:text-red-800 active:bg-red-50 transition duration-150 ease-in-out">
            <svg class="sm:-ml-1 sm:mr-2 h-5 w-5 text-red-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            <span class="hidden sm:block text-red-400 hover:text-red-500">Удалить</span>
          </a>
        </span>
      </div>

      <div class="px-4 sm:px-6 flex items-center justify-between">
        <div class="flex-1 min-w-0 max-w-md items-center flex">
          <img :src="cafe.company.logo_url" alt="" class="h-20 w-20 rounded-full">

          <div class="ml-5">
            <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
              {{ cafe.location_name }}
            </h1>
            <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
              <nuxt-link :to="'/companies/' + cafe.company.slug" class="mt-2 flex items-center text-md leading-5 text-gray-500 sm:mr-6 hover:underline">
                {{ cafe.company.name }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <div class="">
        <div class="mt-10 px-4" v-show="cafe.description">
          <div class="text-3xl font-bold text-black mb-2">Описание</div>
          <div>
            {{ cafe.description }}
          </div>
        </div>

        <div class="mt-10 px-4" v-if="cafe.brew_methods.length">
          <div class="text-3xl font-bold text-black mb-4">Способы заваривания</div>
          <div class="flex flex-col flex-wrap w-full md:flex-row">
            <div class="flex items-start w-full md:w-1/2 lg:w-1/3 pr-10 mb-4" v-for="brew_method in cafe.brew_methods" :key="brew_method.id">
              <div class="px-4 py-6 border border-gray-400 rounded-md w-full">
                <span class="font-bold capitalize text-base text-gray-700 leading-none">{{ brew_method.method }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-10 px-4" v-if="( cafe.matcha || cafe.tea )">
          <div class="text-3xl font-bold text-black mb-4">Варианты напитков</div>
          <div class="flex flex-col w-full md:flex-row">
            <div class="flex items-start w-full md:w-1/2 lg:w-1/3" v-if="cafe.matcha">
              <img src="/img/icons/matcha.svg" class="mr-5">
              <div class="flex flex-col">
                <span class="font-bold text-base leading-none">Матча</span>
                <span class="text-base text-gray-600">Матча доступен здесь.</span>
              </div>
            </div>

            <div class="flex items-start mt-4 w-full md:mt-0 md:w-1/2 lg:w-1/3" v-if="cafe.tea">
              <img src="/img/icons/tea.svg" class="mr-5">
              <div class="flex flex-col">
                <span class="font-bold text-base leading-none">Чай</span>
                <span class="text-base text-gray-600">Это кафе тоже делает чай.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'App',
  async asyncData( ctx ) {
    return {
      cafe: await ctx.app.$api.cafes.show( ctx.params.company, ctx.params.cafe )
    }
  },
  methods: {
    async deleteCafe() {
      if ( confirm('Are you sure you want to delete?') ) {
        await this.$api.cafes.delete( this.cafe.company.slug, this.cafe.slug )
            .then( function() {
              this.$router.push({
                path: '/companies/' + this.cafe.company.slug
              })
            }.bind( this ) );
      }
    }
  },
}
</script>