import { HttpResourceRef, httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../Modules/country';

@Injectable({
  providedIn: 'root'
})
export class HttpResourceCountryService {
  
  // Create httpResource for all countries
  private countriesResource: HttpResourceRef<Country[] | undefined> = httpResource<Country[]>(() => ({
    url: 'https://restcountries.com/v3.1/all',
    method: 'GET',
    transform: (response: any[]) => response.map(country => ({
      name: country.name,
      flags: country.flags,
      idd: country.idd?.root + (country.idd?.suffixes?.[0] || '') || country.cca2,
      region: country.region,
      population: country.population
    }))
  }));

  // Get all countries
  getAllCountries() {
    return {
      data: this.countriesResource.value,
      isLoading: this.countriesResource.isLoading,
      error: this.countriesResource.error
    };
  }
  
}
