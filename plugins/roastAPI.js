import CompaniesAPI from '@/api/companies';
import CafesAPI from '@/api/cafes';
import BrewMethodsAPI from '@/api/brew_methods';

export default function({ $axios }, inject) {
  const api ={
    companies: CompaniesAPI( $axios ),
    cafes: CafesAPI( $axios ),
    brew_methods: BrewMethodsAPI( $axios )
  }

  inject('api', api);
}