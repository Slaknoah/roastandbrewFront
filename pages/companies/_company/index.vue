<template>
  <div>
    <div class="w-full bg-cover bg-center h-56.25 md:h-72 lg:h-125" :style="'background-image: url(' + company.header_image_url + ')'"></div>
    <div class="flex flex-col pb-10 pt-10 w-full mx-auto max-w-screen-xl">
      <div class="mb-5 flex justify-end px-4 sm:px-6 lg:ml-4 lg:flex-row">
        <span class="shadow-sm rounded-md mr-2" v-if="$auth.loggedIn">
          <nuxt-link :to="'/companies/' + company.slug + '/edit'" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
            <svg class="sm:-ml-1 sm:mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            <span class="hidden sm:block">Изменить</span>
          </nuxt-link>
        </span>

        <span class="shadow-sm rounded-md" v-if="$auth.loggedIn">
          <a @click.prevent="deleteCompany" href="#" class="inline-flex items-center px-4 py-2 border border-red-400 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:border-red-500 focus:outline-none focus:shadow-outline-red focus:border-red-300 active:text-red-800 active:bg-red-50 transition duration-150 ease-in-out">
            <svg class="sm:-ml-1 sm:mr-2 h-5 w-5 text-red-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            <span class="hidden sm:block text-red-400 hover:text-red-500">Удалить</span>
          </a>
        </span>
      </div>

      <div class="px-4 sm:px-6 flex items-center justify-between">
        <div class="flex-1 min-w-0 max-w-md items-center flex">
          <img :src="company.logo_url" alt="" class="h-20 w-20 rounded-full">

          <div class="ml-5">
            <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
              {{ company.name }}
            </h1>
            <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
              <div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6" v-if="company.cafes_count">
                <svg class="flex-shrink-0 mr-1 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                {{ company.cafes_count }} Кафе
              </div>
              <div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6" v-if="company.roaster">
                <svg class="flex-shrink-0 mr-1 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                Ростер
              </div>
              <div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
                <!-- Heroicon name: location-marker -->
                <svg class="flex-shrink-0 mr-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                {{ company.city }}, {{ company.state }}
              </div>
              <a :href="company.website" target="_blank" class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                <svg class="flex-shrink-0 mr-1 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                Веб-сайт
              </a>
            </div>
          </div>
        </div>

        <div class="mt-5 flex lg:mt-0 lg:ml-4 lg:flex-row flex-col">
          <div class="flex flex-col items-center mb-1 w-24">
            <img src="/img/ui/like.svg" class="cursor-pointer" v-if="!liked" @click="likeCompany">
            <img src="/img/ui/liked.svg" class="cursor-pointer" v-else @click="likeCompany">
            <span class="text-base text-gray-500" v-if="likes">{{ likes }}</span>
          </div>
        </div>
      </div>

      <div class="">
        <div class="mt-10 px-4">
          <div class="text-3xl font-bold text-black mb-2">Описание</div>
          <div>
            {{ company.description }}
          </div>
        </div>

        <div class="mt-10 px-4">
          <div class="text-3xl font-bold text-black mb-4">Услуги</div>
          <div class="flex flex-col w-full md:flex-row">
            <div class="flex items-start w-full md:w-1/2 lg:w-1/3" v-if="company.roaster">
              <img src="/img/icons/coffee-bag.svg" class="mr-5">
              <div class="flex flex-col">
                <span class="font-bold text-base leading-none">Ростер</span>
                <span class="text-base text-gray-600">Эта компания обжаривает свой кофе.</span>
              </div>
            </div>

            <div class="flex items-start mt-4 w-full md:mt-0 md:w-1/2 lg:w-1/3" v-if="company.subscription">
              <img src="/img/icons/subscription.svg" class="mr-5">
              <div class="flex flex-col">
                <span class="font-bold text-base leading-none">Подписка доступна</span>
                <span class="text-base text-gray-600">Посетите их веб-сайт для получения информации о подписке.</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-10 px-4">
          <div class="text-3xl font-bold text-black mb-2">
            Кафе
            <a class="text-green-600 font-bold text-base ml-1"
              @click="login('navigate-to-add-cafe')"
              v-if="!$auth.loggedIn">Add Cafe →</a>
            <nuxt-link :to="'/companies/'+company.slug+'/cafes/new'"
                      class="text-green-600 font-bold text-base ml-1"
                      v-if="$auth.loggedIn">Add Cafe →</nuxt-link>
          </div>
          <div class="flex justify-start flex-wrap overflow-x-auto pt-2 lg:flex-wrap">
            <nuxt-link v-for="cafe in cafes"
                      :key="cafe.id"
                      :to="'/companies/'+company.slug+'/cafes/'+cafe.slug"
                      class="flex-grow-0 flex-shrink-0 mb-5 mr-4 cursor-pointer w-full sm:w-48 md:w-56.25">

              <div class="bg-white border-b-2 border-gray-200 rounded-15" style="box-shadow: rgba(0, 0, 0, 0.21) 0px 2px 9px 0px;">
                <div class="block w-full bg-center bg-cover rounded-t-15 h-32 md:h-48" :style="'background-image: url(' + cafe.primary_image_url + ');'">
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
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus';
import { mapState } from 'vuex';

export default {
  layout: 'App',
  async asyncData( { app, params, error } ) {
    try {
      const [ company, cafes ] = await Promise.all([
        app.$api.companies.show( params.company ),
        app.$api.cafes.index( params.company )
      ]);

      return {
        company: company,
        cafes: cafes
      }
    } catch( e ) {
      error( {
        statusCode: 404, message: ''
      } );
    }
  },
  data() {
    return {
      likes: 0,
      liked: false,
    }
  },
  computed: {
    ...mapState('pendingActions', {
      'preAuthAction': state => state.preAuthAction
    })
  },
  methods: {
    async deleteCompany() {
      if ( confirm('Are you sure you want to delete?') ) {
        await this.$api.companies.delete( this.company.slug )
          .then( function ( response ) {
            this.$router.push( {
              path: `/companies`
            } );
          }.bind( this ) );
      }

    },

    setUpLikes() {
      if ( this.$auth.loggedIn ) {
        this.liked = this.company.liked;
      }

      this.likes = this.company.likes_count;
    },

    async likeCompany() {
      if ( this.$auth.loggedIn ) {
        let toggleLike = await this.$api.companies.like( this.$route.params.company );
        this.liked = toggleLike.status;
        this.likes = toggleLike.likes;
      } else {
        this.$store.commit('pendingActions/setPreAuthAction', {
          action: 'like-company',
          company: this.$route.params.company
        } );

        EventBus.$emit('prompt-login');
      }
    },

    login( preAuthAction = '' ) {
      if (preAuthAction != '') {
        switch( preAuthAction ) {
          case 'navigate-to-add-cafe':
            this.$store.commit( 'pendingActions/setPreAuthAction', {
              action: 'navigate',
              route: `/companies/${this.company.slug}/cafes/new`
            })
          break;
        }
      }

      EventBus.$emit('prompt-login');
    },

    runPreAuthAction() {
      switch ( this.preAuthAction.action ) {
        case 'like-company':
          this.likeCompany();
        break;
      }

      this.$store.commit( 'pendingActions/setPreAuthAction', {} );
    }
  },
  async mounted() {
    EventBus.$off('roast-login');

    EventBus.$on('roast-login', function() {
      this.runPreAuthAction();
    }.bind(this));
    this.setUpLikes();
  }
}
</script>

<style scoped>
  input[type="file"]{
      position: absolute;
      top: -5000px;
  }
</style>