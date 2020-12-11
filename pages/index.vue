<template>
  <div>
    <h2></h2>
    <div class="px-4 mt-5">
      <div v-if="cafes" class="flex justify-start flex-wrap overflow-x-auto pt-2 lg:flex-wrap">
        <nuxt-link v-for="cafe in cafes"
                  :key="cafe.id"
                  :to="'/companies/'+cafe.company.slug+'/cafes/'+cafe.slug"
                  class="flex-grow-0 flex-shrink-0 mb-5 mr-4 cursor-pointer w-full sm:w-48 md:w-56.25">

          <div class="bg-white border-b-2 border-gray-200 rounded-15" style="box-shadow: rgba(0, 0, 0, 0.21) 0px 2px 9px 0px;">
            <div class="block w-full bg-center bg-cover rounded-t-15 h-40 md:h-48" :style="'background-image: url(' + cafe.primary_image_url + ');'">
            </div>
            <div class="flex flex-col border-t border-lightBlueBorder py-5 px-4">
              <span class="font-bold text-base w-full truncate">{{ cafe.location_name }}</span>
              <div class="flex">
                <span class="text-xs text-textGray">{{ `${ cafe.city }, ${ cafe.country }`  }}</span>
              </div>
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
  middleware: ['auth'],
  async asyncData( { app, params, error } ) {
    try {
      const cafes = await app.$api.cafes.search();

      return {
        cafes: cafes
      }
    } catch( e ) {
      error( {
        statusCode: 404, message: ''
      } );
    }
  },
  // middleware: ['auth', 'verified'],
}
</script>

<style>

</style>
