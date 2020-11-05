<template>
  <div id="admin-settings" class="flex-1 flex flex-col">
        <div class="flex flex-col pb-10 pt-10 w-full mx-auto max-w-screen-xl">
            <div v-if="$auth.user.permission == 'admin'" class="px-4 sm:px-6 flex items-center justify-between">
              <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                Admin
              </h1>
            </div>

            <div class="flex flex-wrap px-4 sm:px-6 mt-4" v-if="$auth.user.permission == 'admin'">
                <div class="w-full pb-4 md:pb-0 pr-0 md:pr-4 md:w-1/3">
                    <nuxt-link :to="'/system-settings/brew-methods'" class="p-6 bg-white rounded flex flex-col items-start" style="box-shadow: 0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24);">
                        <img src="/img/ui/brew-methods.svg" class="mb-4 w-8 h-8"/>
                        <span class="font-sans-lato text-xl font-bold text-secondaryBlack">Brew Methods</span>
                        <span class="font-sans-lato text-base text-textGray">Manage available cafe brew methods</span>
                    </nuxt-link>
                </div>

                <div class="w-full pb-4 md:pb-0 pr-0 md:pr-4 md:w-1/3">
                    <nuxt-link :to="'/system-settings/amenities'" class="p-6 bg-white rounded flex flex-col items-start" style="box-shadow: 0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24);">
                        <img src="/img/ui/amenities.svg" class="mb-4 w-8 h-8"/>
                        <span class="font-sans-lato text-xl font-bold text-secondaryBlack">Amenities</span>
                        <span class="font-sans-lato text-base text-textGray">Manage cafe amenities</span>
                    </nuxt-link>
                </div>

                <div class="w-full md:w-1/3">
                    <nuxt-link :to="'/system-settings/drink-options'" class="p-6 bg-white rounded flex flex-col items-start" style="box-shadow: 0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24);">
                        <img src="/img/ui/drink-options.svg" class="mb-4 w-8 h-8"/>
                        <span class="font-sans-lato text-xl font-bold text-secondaryBlack">Drink Options</span>
                        <span class="font-sans-lato text-base text-textGray">Manage drink options available at cafes</span>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  layout: 'App',
  middleware: 'admin'
}
</script>