import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: { svg: string };
  idd: string;
  region?: string;
  population?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SignalCountryService {
  private http = inject(HttpClient);
  
  // Use signals for state management instead of httpResource for better error handling
  private countriesSignal = signal<Country[]>([]);
  private loadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);

  constructor() {
    // Load initial data
    this.loadCountries();
  }

  private async loadCountries() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    
    try {
      // Try to fetch all countries, but with better error handling
      const response = await fetch('https://restcountries.com/v3.1/all');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const countries = data.map((country: any) => ({
        name: country.name,
        flags: country.flags,
        idd: country.idd?.root + (country.idd?.suffixes?.[0] || '') || country.cca2,
        region: country.region,
        population: country.population
      }));
      
      this.countriesSignal.set(countries);
      this.loadingSignal.set(false);
    } catch (error) {
      console.error('Error loading countries:', error);
      this.errorSignal.set(error instanceof Error ? error.message : 'Failed to load countries');
      this.loadingSignal.set(false);
      
      // Fallback to mock data if API fails
      this.loadMockData();
    }
  }

  private loadMockData() {
    const mockCountries: Country[] = [
      {
        name: { common: 'United Kingdom', official: 'United Kingdom of Great Britain and Northern Ireland' },
        flags: { svg: 'https://flagcdn.com/gb.svg' },
        idd: 'GB',
        region: 'Europe',
        population: 67215293
      },
      {
        name: { common: 'United States', official: 'United States of America' },
        flags: { svg: 'https://flagcdn.com/us.svg' },
        idd: 'US',
        region: 'Americas',
        population: 329484123
      },
      {
        name: { common: 'Canada', official: 'Canada' },
        flags: { svg: 'https://flagcdn.com/ca.svg' },
        idd: 'CA',
        region: 'Americas',
        population: 38005238
      },
      {
        name: { common: 'Australia', official: 'Commonwealth of Australia' },
        flags: { svg: 'https://flagcdn.com/au.svg' },
        idd: 'AU',
        region: 'Oceania',
        population: 25499884
      },
      {
        name: { common: 'Germany', official: 'Federal Republic of Germany' },
        flags: { svg: 'https://flagcdn.com/de.svg' },
        idd: 'DE',
        region: 'Europe',
        population: 83240525
      }
    ];
    
    this.countriesSignal.set(mockCountries);
  }

  getCountries() {
    return {
      data: this.countriesSignal,
      isLoading: this.loadingSignal,
      error: this.errorSignal
    };
  }
} 