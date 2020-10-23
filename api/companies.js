export default $axios => ({
  async index( params ) {
    try {
      return await $axios.$get( '/api/v1/companies', {
        params: params
      });
    } catch ( err ) {
      console.log( err );
      if ( err ) {

      }
    }
  },

  async store( company ) {
    try {
      return await $axios.$post( '/api/v1/companies', company, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      } );
    } catch ( err ) {

    }
  },

  async show( slug ) {
    try {
      return await $axios.$get( `/api/v1/companies/${slug}` );
    } catch ( err ) {
      console.log( err );
    }
  },

  async delete( slug ) {
    try {
      return await $axios.$delete( `/api/v1/companies/${slug}` );
    } catch ( err ) {
      console.log( err );
    }
  },

  async update( slug, company ) {
    try {
      return await $axios.$post( `/api/v1/companies/${slug}`, company, {
        'Content-Type': 'multipart/form-data'
      });
    } catch ( err ) {

    }
  }
})