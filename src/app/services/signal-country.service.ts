import { HttpResourceRef, httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: { svg: string };
  idd: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignalCountryService {
  private countriesResource: HttpResourceRef<Country[] | undefined> = httpResource<Country[]>(() => ({
    url: 'https://restcountries.com/v3.1/all',
    method: 'GET',
    transform: (response: any[]) => response.map(country => ({
      name: country.name,
      flags: country.flags,
      idd: country.idd?.root + (country.idd?.suffixes?.[0] || '') || country.cca2
    }))
  }));

  // The request is automatically made when the resource is created (no need for explicit fetch)
  getCountries() {
    return {
      data: this.countriesResource.value,
      isLoading: this.countriesResource.isLoading,
      error: this.countriesResource.error
    };
  }

} 