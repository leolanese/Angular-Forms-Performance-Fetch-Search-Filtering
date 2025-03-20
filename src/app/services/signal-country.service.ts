import { Injectable, signal } from '@angular/core';

export interface Country {
  name: string;
  flags: { svg: string };
  idd: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignalCountryService {
  private countries = signal<Country[]>([]);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

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
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      this.countries.set(data.map((country: any) => ({
        name: country.name.common,
        flags: country.flags,
        idd: country.idd?.root + (country.idd?.suffixes?.[0] || '') || country.cca2
      })));
    } catch (error) {
      this.error.set('Failed to load countries');
      console.error('Failed to load countries:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
} 