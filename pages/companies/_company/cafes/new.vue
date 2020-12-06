<template>
  <div>
    <div v-show="processing" class="z-modal fixed bg-opacity-75 bg-white top-0 right-0 left-0 bottom-0 flex items-center justify-center">
        <img src="/img/ui/loader.svg"/>
    </div>
    <div class="flex flex-col pb-10 pt-10 w-full mx-auto max-w-screen-lg">
      <div class="mt-4 flex justify-between flex-wrap overflow-x-auto pt-2 px-4 sm:px-6 lg:flex-wrap">
        <div class="sm:border md:rounded-lg mt-7.5 sm:p-10 w-full mb-8">
          <label class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" for="grid-company-name">
            Название компании
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3
                          leading-tight focus:outline-none focus:bg-white"
                  id="grid-company-name"
                  :value="company.name"
                  type="text"
                  disabled
                  placeholder="Koch-Vandervort">
          <p class="text-md text-gray-700">Если вы хотите отредактировать информацию о компании,
            <nuxt-link class="underline text-blue-500" :to="'/companies/' + company.slug + '/edit'">отредактируйте компанию здесь</nuxt-link>
          </p>
        </div>

        <form class="w-full mx-auto sm:border md:rounded-lg mt-7.5 sm:p-10">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" for="grid-name">
                Название кафе
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3
                              leading-tight focus:outline-none focus:bg-white"
                      :class="{ 'border-red-500': !validations.location_name }"
                      id="grid-name"
                      v-model="form.location_name"
                      type="text"
                      placeholder="Koch-Vandervort">
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" for="grid-description">
                Описание
              </label>
              <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200
                                rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        rows="8"
                        v-model="form.description"
                        id="grid-description">
              </textarea>
              <p class="text-gray-600 text-xs italic">Напишите столько, сколько хотите</p>
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 mb-5">
              <label class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2">Фото кафе</label>
              <div class="flex flex-col">
                  <img src="/img/placeholders/banner.svg" class="w-64 mb-3 pointer-events-none" v-show="!showCafeImagePreview"/>
                  <img class="block w-64 mb-3 pointer-events-none" v-show="showCafeImagePreview" :src="cafeImagePreview"/>

                  <div class="flex flex-col">
                      <div class="flex items-center">
                          <a class="py-2 px-6 px-text-base text-black uppercase border-2 border-black rounded cursor-pointer mr-3" v-on:click="chooseCafeImage()">
                            Загрузить фото
                          </a>

                          <a v-on:click="deleteCafeImage()" class="underline text-red-400 cursor-pointer">
                            Удалить фото
                          </a>
                      </div>
                      <div class="flex text-gray-500 text-base">
                            <input ref="cafeImageFile" v-on:change="handleCafeImageUpload()" accept="image/*" id="companyHeader" type="file"/>
                          1200px by 600px or larger reccommended.
                      </div>
                  </div>
              </div>
              <div v-show="!validations.primary_image" class="mt-1 text-red-500 text-sm">An image must be uploaded!</div>
            </div>
          </div>

          <div class="text-gray-700 text-xl font-bold mb-2">Место расположения</div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-2">
              <label class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" for="grid-country">
                Страна
              </label>
              <div class="relative">
                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700
                                py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-country"
                        :class="{ 'border-red-500': !validations.country }"
                        v-model="form.country">
                  <option value="KZ">Казахстан</option>
                  <option value="RU">Россия</option>
                  <option value="UA">Украина</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-2" v-show="form.country == 'KZ'">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Область
              </label>
              <div class="relative">
                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700
                                py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        :class="{ 'border-red-500': !validations.state }"
                        v-model="form.state">
                  <option value="nur-sultan">Нур-Султан</option>
                  <option value="almaty">Алматинская область</option>
                  <option value="south-kazakhstan">Южно-Казахстанская область</option>
                  <option value="AR">Акмолинская область</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-2">
              <label class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" for="grid-city">
                Город
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded
                              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      :class="{ 'border-red-500': !validations.city }"
                      id="grid-city"
                      type="text"
                      v-model="form.city"
                      placeholder="Albuquerque">
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-2">
              <label class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" for="grid-address">
                Адрес
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded
                              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-address"
                      type="text"
                      :class="{ 'border-red-500': !validations.address }"
                      v-model="form.address"
                      placeholder="711-2880 Nulla St.">
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" for="grid-zip">
                Почтовый индекс
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200
                              rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="text"
                      v-model="form.zip"
                      placeholder="90210">
            </div>
          </div>

          <div class="text-gray-700 text-xl font-bold mb-4">Варианты напитков</div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="roast-checkbox-container flex items-center">
                <span class="font-sans-lato text-base">Матча</span>
                <input type="checkbox" v-model="form.matcha"> <span class="roast-checkmark"></span>
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="roast-checkbox-container flex items-center">
                <span class="font-sans-lato text-base">Чай</span>
                <input type="checkbox" v-model="form.tea"> <span class="roast-checkmark"></span>
              </label>
            </div>
          </div>

          <div class="text-gray-700 text-xl font-bold mb-4">Способы заваривания</div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6" v-for="brew_method in brew_methods" :key="brew_method.id">
              <label class="roast-checkbox-container flex items-center">
                <span class="font-sans-lato text-base capitalize">{{ brew_method.method }}</span>
                <input type="checkbox"
                      :value="brew_method.id"
                      @change="handleBrewMethod( $event, brew_method.id )"
                      v-model="form.brew_methods">
                <span class="roast-checkmark"></span>
              </label>
            </div>
          </div>

          <button type="button"
                  class="float-right inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5
                          font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none
                          focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
                  @click.prevent="addCafe">
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
            </svg>
            Добавить
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'App',
  middleware: 'auth',
  async asyncData( ctx ) {
    return {
      company: await ctx.app.$api.companies.show( ctx.params.company ),
      brew_methods: await ctx.app.$api.brew_methods.index()
    }
  },
  data() {
    return {
      processing: false,

      showCafeImagePreview: false,
      cafeImagePreview: false,

      form: {
        location_name: '',
        description: '',
        primary_image: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        tea: 0,
        matcha: 0,
        brew_methods: []
      },

      validations: {
        location_name: true,
        primary_image: true,
        country: true,
        address: true,
        city: true,
        state: true
      }
    }
  },
  methods: {
    handleBrewMethod( event, id ) {
      if ( event.target.checked ) {
        if( this.form.brew_methods.indexOf( id ) === -1 ) this.form.brew_methods.push(id);
      } else {
        const index = this.form.brew_methods.indexOf( id );
        if( index > -1 ) {
          this.form.brew_methods.splice( index, 1 );
        }
      }
    },
    async addCafe() {
      this.processing = true;
      if( this.validateNewCafe() ) {
        let cafeFormData = this.transformToFormData( this.form );

        const newCafe = await this.$api.cafes.store( this.company.slug, cafeFormData )
                          .then( function( response ) {
                            this.processing = false;
                            this.$router.push({
                              path: '/companies/' + this.company.slug + '/cafes/' + response.slug
                            })
                          }.bind( this ) );
      } else {
        this.processing = false;
      }
    },

    validateNewCafe() {
      let validForm = true;

      if( this.form.location_name == '' ) {
        this.validations.location_name = false;
        validForm = false;
      } else {
        this.validations.location_name = true;
      }

      if( this.form.primary_image == '' ) {
        this.validations.primary_image = false;
        validForm = false;
      } else {
        this.validations.primary_image = true;
      }

      if( this.form.country == '' ) {
        this.validations.country = false;
        validForm = false;
      } else {
        this.validations.country = true;
      }

      if( this.form.country == 'US' && this.form.state == '' ) {
        this.validations.state = false;
        validForm = false;
      } else {
        this.validations.state = true;
      }

      if( this.form.address == '' ) {
        this.validations.address = false;
        validForm = false;
      } else {
        this.validations.address = true;
      }

      if( this.form.city == '' ) {
        this.validations.city = false;
        validForm = false;
      } else {
        this.validations.city = true;
      }

      return validForm;
    },

    chooseCafeImage() {
      this.$refs.cafeImageFile.click();
    },

    handleCafeImageUpload() {
      this.form.primary_image = this.$refs.cafeImageFile.files;
      let reader = new FileReader();

      reader.addEventListener( 'load', function() {
        this.showCafeImagePreview = true;
        this.cafeImagePreview = reader.result;
      }.bind( this ), false );

      if ( this.form.primary_image ) {
        if ( /\.(jpe?g|png|gif)$/i.test( this.form.primary_image[0].name ) ) {
          reader.readAsDataURL( this.form.primary_image[0] );
        }
      }
    },

    deleteCafeImage() {
      this.form.primary_image = '';
      this.showCafeImagePreview = false;
      this.cafeImagePreview = '';
    },

    transformToFormData( fields ) {
      let fileKeys = [ 'primary_image' ]
      let formData = new FormData();

      for ( let [ key, value ] of Object.entries( fields ) ) {
        if( fileKeys.indexOf( key ) > -1 ) {
          if ( value !== '' ) formData.append( key, value[0] );
        } else {
          if( typeof value === 'boolean' ) {
            value = value ? 1 : 0;
          }
          formData.append( key, value );
        }
      }

      return formData;
    }
  }
}
</script>

<style scoped>
    input[type="file"]{
        position: absolute;
        top: -5000px;
    }
</style>