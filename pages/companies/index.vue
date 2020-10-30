<template>
  <div>
    <div class="flex flex-col pb-10 pt-10 w-full mx-auto max-w-screen-xl">
      <div class="px-4 sm:px-6 flex items-center justify-between">
        <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
          Companies
        </h1>
        <span class="shadow-sm rounded-md" v-show="$auth.loggedIn">
          <nuxt-link to="/companies/new" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
            <svg class="sm:-ml-1 sm:mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            <span class="hidden sm:block">Add company</span>
          </nuxt-link>
        </span>
      </div>

      <div class="companies-list mt-4 flex justify-between flex-wrap overflow-x-auto pt-2 px-4 sm:px-6 lg:flex-wrap">
        <nuxt-link v-for="company in companies"
                  :key="company.id"
                  :to="'/companies/'+company.slug"
                  class="flex-grow-0 flex-shrink-0 mb-5 cursor-pointer w-full sm:w-48 md:w-56.25">

          <div class="bg-white border-b-2 border-gray-200 rounded-15" style="box-shadow: rgba(0, 0, 0, 0.21) 0px 2px 9px 0px;">
            <div class="block w-full bg-center bg-cover rounded-t-15 h-32 md:h-48" :style="'background-image: url(' + company.header_image_url + ');'">
            </div>
            <div class="flex flex-col border-t border-lightBlueBorder py-5 px-4">
              <span class="font-bold text-base w-full truncate">{{ company.name }}</span>
              <div class="flex">
                <span class="text-xs text-textGray">{{ `${ company.city }, ${ company.country }`  }}</span>
              </div>
              <span class="text-xs italic text-textGray" v-show="company.cafes_count">{{ company.cafes_count}} cafes</span>
            </div>
          </div>

        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'App',
  async asyncData( ctx ) {
    return {
      companies: await ctx.app.$api.companies.index()
    }
  },
}
</script>