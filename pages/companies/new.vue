<template>
  <div>
    <div v-show="processing" class="z-modal fixed bg-opacity-75 bg-white top-0 right-0 left-0 bottom-0 flex items-center justify-center">
        <img src="/img/ui/loader.svg"/>
    </div>
    <div class="flex flex-col pb-10 pt-10 w-full mx-auto max-w-screen-lg">
      <div class="px-4 sm:px-6 flex items-center justify-between">
        <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
          Новая компания
        </h1>
      </div>

      <div class="mt-4 flex justify-between flex-wrap overflow-x-auto pt-2 px-4 sm:px-6 lg:flex-wrap">
        <form class="w-full mx-auto sm:border md:rounded-lg mt-7.5 sm:p-10">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                Название
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3
                              leading-tight focus:outline-none focus:bg-white"
                      :class="{ 'border-red-500': !validations.name }"
                      id="grid-name"
                      v-model="form.name"
                      type="text"
                      placeholder="Koch-Vandervort">
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-5">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Header Image</label>
              <div class="flex flex-col">
                  <img src="/img/placeholders/banner.svg" class="w-64 mb-3 pointer-events-none" v-show="!showHeaderPreview"/>
                  <img class="block w-64 mb-3 pointer-events-none" v-show="showHeaderPreview" :src="headerPreview"/>

                  <div class="flex flex-col">
                      <div class="flex items-center">
                          <a class="py-2 px-6 px-text-base text-black uppercase border-2 border-black rounded cursor-pointer mr-3" v-on:click="chooseCompanyHeader()">
                              Загрузить фото
                          </a>

                          <a v-on:click="deleteCompanyHeader()" class="underline text-red-400 cursor-pointer">
                              Удалить фото
                          </a>
                      </div>
                      <div class="flex text-gray-500 text-base">
                            <input ref="headerFile" v-on:change="handleCompanyHeaderUpload()" accept="image/*" id="companyHeader" type="file"/>
                          Рекомендуется 1200 на 600 пикселей или больше.
                      </div>
                  </div>
              </div>
              <div v-show="!validations.header" class="mt-1 text-alertRed text-sm">A header must be uploaded!</div>
            </div>

            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Логотип</label>
              <div class="flex flex-col">
                  <img src="/img/placeholders/logo.svg" class="w-24 mb-10 h-24 mr-3 pointer-events-none" v-show="!showLogoPreview"/>
                  <img class="block w-24 h-24 mr-3 mb-5 pointer-events-none" v-show="showLogoPreview" :src="logoPreview"/>

                  <div class="flex flex-col">
                      <div class="flex items-center">
                          <a class="py-2 px-6 px-text-base text-black uppercase border-2 border-black rounded cursor-pointer mr-3" v-on:click="chooseCompanyLogo()">
                              Загрузить фото
                          </a>

                          <a v-on:click="deleteCompanyLogo()" class="underline text-red-400 cursor-pointer">
                              Удалить фото
                          </a>
                      </div>
                      <div class="flex text-gray-500 text-base">
                          <input ref="logoFile" v-on:change="handleCompanyLogoUpload()" accept="image/*" id="companyLogo" type="file"/>
                          Рекомендуется 225 на 225 пикселей или больше.
                      </div>
                  </div>
              </div>
              <div v-show="!validations.logo" class="mt-1 text-alertRed text-sm">A logo must be uploaded!</div>
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-description">
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

          <div class="text-gray-700 text-xl font-bold mb-2">Место расположения</div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-2">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
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
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
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
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-address">
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
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Почтовый индекс
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200
                              rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="text"
                      :class="{ 'border-red-500': !validations.zip }"
                      v-model="form.zip"
                      placeholder="90210">
            </div>
          </div>

          <div class="text-gray-700 text-xl font-bold mb-2">Социальные сети</div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-2">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-website">
                Веб-сайт
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded
                              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-website"
                      type="text"
                      v-model="form.website"
                      placeholder="https://voch-vandervort.com">
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-facebook">
                Facebook
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded
                              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-facebook"
                      type="text"
                      v-model="form.facebook_url"
                      placeholder="https://facebook.com">
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-twitter">
                Twitter
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                              px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-twitter"
                      type="text"
                      v-model="form.twitter_url"
                      placeholder="https://twitter.com">
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-instagram">
                Instagram
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded
                              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-instagram"
                      type="text"
                      v-model="form.instagram_url"
                      placeholder="https://instagram.com">
            </div>
          </div>

          <div class="text-gray-700 text-xl font-bold mb-4">Предлагаемые услуги</div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="roast-checkbox-container flex items-center">
                <span class="font-sans-lato text-base">Эта компания обжаривает свой кофе</span>
                <input type="checkbox" v-model="form.roaster"> <span class="roast-checkmark"></span>
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="roast-checkbox-container flex items-center">
                <span class="font-sans-lato text-base">Кофе доступен по подписке.</span>
                <input type="checkbox" v-model="form.subscription"> <span class="roast-checkmark"></span>
              </label>
            </div>
          </div>

          <button type="button"
                  class="float-right inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5
                          font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none
                          focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
                  @click.prevent="saveCompany">
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
  data() {
    return {
      processing: false,

      logoPreview: '',
      showLogoPreview: false,

      headerPreview: '',
      showHeaderPreview: false,

      form: {
        name: '',
        roaster: 0,
        subscription: 0,
        description: '',
        website: '',
        address: '',
        country: '',
        city: '',
        state: '',
        zip: '',
        facebook_url: '',
        twitter_url: '',
        instagram_url: '',
        header: '',
        logo: ''
      },

      validations: {
        name: true,
        city: true,
        country: true,
        state: true,
        address: true,
        zip: true,
        header: true,
        logo: true
      },
    }
  },
  methods: {
    validateNewCompany() {
      if ( this.form.name == '' ) {
        this.validations.name = false;
      } else {
        this.validations.name = true;
      }

      if ( this.form.country == '' ) {
        this.validations.country = false;
      } else {
        this.validations.country = true;
      }

      if ( this.form.city == '' ) {
        this.validations.city = false;
      } else {
        this.validations.city = true;
      }

      if ( this.form.country == 'US' && this.form.state == '' ) {
        this.validations.state = false;
      } else {
        this.validations.state = true;
      }

      if ( this.form.zip == '' ) {
        this.validations.zip = false;
      } else {
        this.validations.zip = true;
      }

      if ( this.form.address == '' ) {
        this.validations.address = false;
      } else {
        this.validations.address = true;
      }

      return ( this.validations.name && this.validations.city && this.validations.state ) ? true : false;
    },

    chooseCompanyLogo() {
      this.$refs.logoFile.click();
    },

    handleCompanyLogoUpload() {
      this.form.logo = this.$refs.logoFile.files;
      let reader = new FileReader();

      reader.addEventListener( 'load', function() {
        this.showLogoPreview = true;
        this.logoPreview = reader.result;
      }.bind( this ), false );

      if ( this.form.logo ) {
        if ( /\.(jpe?g|png|gif)$/i.test( this.form.logo[0].name ) ) {
          reader.readAsDataURL( this.form.logo[0] );
        }
      }
    },

    deleteCompanyLogo() {
      this.form.logo = '';
      this.showLogoPreview = false;
      this.logoPreview = '';
    },

    chooseCompanyHeader() {
      this.$refs.headerFile.click();
    },

    handleCompanyHeaderUpload() {
      this.processing = true;
      this.form.header = this.$refs.headerFile.files;
      let reader = new FileReader();

      reader.addEventListener( 'load', function() {
        this.showHeaderPreview = true;
        this.headerPreview = reader.result;
        this.processing = false;
      }.bind( this ), false );

      if ( this.form.header ) {
        if ( /\.(jpe?g|png|gif)$/i.test( this.form.header[0].name ) ) {
          reader.readAsDataURL( this.form.header[0] );
        }
      }
    },

    deleteCompanyHeader() {
      this.form.header = '';
      this.showHeaderPreview = false;
      this.headerPreview = '';
    },

    async saveCompany() {
      this.processing = true;

      if ( this.validateNewCompany() ) {
        try {
          let formData = this.transformToFormData( this.form );
          await this.$api.companies.store( formData )
            .then( function( company ) {
                this.processing = false;
                this.$router.push({
                  path: `/companies/${ company.slug }`
                });
            }.bind( this ) );
        } catch( error ) {
          console.log( error );
        }
      } else {
        this.processing = false;
      }
    },

    transformToFormData( fields ) {
      let fileKeys = [ 'header', 'logo' ];
      let formData = new FormData();

      for ( let [ key, value ] of Object.entries( fields ) ) {
        if ( fileKeys.indexOf(key) > -1 ) {
          if ( value !== '' ) {
            formData.append( key, value[0] );
          }
        } else {
          if ( typeof(value) === "boolean" ) {
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
