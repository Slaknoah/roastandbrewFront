export default $axios => ({
  async index( company ) {
    try {
      return await $axios.$get( '/api/v1/companies/' + company + '/cafes' );
    } catch ( err ) {
      // console.log( err );
    }
  },


  async show ( company, cafe ) {
    try {
      return await $axios.$get( '/api/v1/companies/' + company + '/cafes/' + cafe );
    } catch ( err ) {
      // console.log( err );
    }
  },

  async store ( company, cafe ) {
    try {
      return await $axios.$get( '/api/v1/companies/' + company + '/cafes', cafe , {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      } );
    } catch ( err ) {
      console.log( err );
    }
  },

  async update ( company, cafe, updates ) {
    try {
      return await $axios.$get( '/api/v1/companies/' + company + '/cafes/' + cafe, updates, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      } );
    } catch ( err ) {
      console.log( err );
    }
  },

  async delete ( company, cafe ) {
    try {
      return await $axios.$delete( '/api/v1/companies/' + company + '/cafes/' + cafe );
    } catch ( err ) {
      console.log( err );
    }
  }
});