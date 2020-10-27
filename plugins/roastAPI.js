import CompaniesAPI from '@/api/companies';
import CafesAPI from '@/api/cafes';

export default function({ $axios }, inject) {
  const api ={
    companies: CompaniesAPI( $axios ),
    cafes: CafesAPI( $axios ),
  }

  inject('api', api);
}