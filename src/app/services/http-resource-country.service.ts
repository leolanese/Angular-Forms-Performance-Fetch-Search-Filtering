import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map } from 'rxjs/operators';

export interface Country {
  name: string;
  flags: { svg: string };
  idd: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpResourceCountryService {
  private countries = signal<Country[]>([]);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getCountries() {
    return {
      data: this.countries,
      isLoading: this.isLoading,
      error: this.error
    };
  }

  async fetchCountries() {
    this.isLoading.set(true);
    this.error.set(null);
    
    try {
      const data = await this.http.get<any[]>('https://restcountries.com/v3.1/all')
        .pipe(
          map(countries => countries.map(country => ({
            name: country.name.common,
            flags: country.flags,
            idd: country.idd?.root + (country.idd?.suffixes?.[0] || '') || country.cca2
          })))
        )
        .toPromise();

      this.countries.set(data || []);
    } catch (error) {
      this.error.set('Failed to load countries');
      console.error('Failed to load countries:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
} 