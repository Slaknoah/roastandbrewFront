export default $axios => ({
  async index( params ) {
    try {
      return await $axios.$get( '/api/v1/companies', {
        params: params
      });
    } catch ( err ) {
      throw err;
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
      throw err;
    }
  },

  async show( slug ) {
    try {
      return await $axios.$get( `/api/v1/companies/${slug}` );
    } catch ( err ) {
      throw err;
    }
  },

  async delete( slug ) {
    try {
      return await $axios.$delete( `/api/v1/companies/${slug}` );
    } catch ( err ) {
      throw err;
    }
  },

  async update( slug, company ) {
    try {
      const response = await $axios.$post( `/api/v1/companies/${slug}`, company, {
        'Content-Type': 'multipart/form-data'
      })

      return response;
    } catch( err ) {
      throw err;
    }
  },

  async like( slug ) {
    try {
      const response = await $axios.$put( `/api/v1/companies/${slug}/like` );

      return response;
    } catch ( err ) {
      throw err;
    }
  }
})