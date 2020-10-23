import CompaniesAPI from '@/api/companies';

export default function({ $axios }, inject) {
  const api ={
    companies: CompaniesAPI( $axios )
  }

  inject('api', api);
}