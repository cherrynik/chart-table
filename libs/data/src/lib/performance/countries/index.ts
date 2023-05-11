import { ICountry, ICountryPerformance } from '../../interfaces';

export * from './companies';

export const countries: Readonly<ICountry[]> = [
  { id: 1, name: 'United States', iso: 'US' },
  { id: 2, name: 'United Kingdom', iso: 'UK' },
  { id: 3, name: 'Japan', iso: 'JP' },
  { id: 4, name: 'Belgium', iso: 'BE' },
  { id: 5, name: 'Brazil', iso: 'BR' },
  { id: 6, name: 'China', iso: 'CN' },
  { id: 7, name: 'Germany', iso: 'DE' },
  { id: 8, name: 'Hungary', iso: 'HU' },
  { id: 9, name: 'Finland', iso: 'FI' },
];

export const performanceOfCountries: Readonly<ICountryPerformance[]> = [
  {
    installs: 13452,
    country: 'United States',
    cost: 25000,
    iso: 'US',
    revenue: 20000,
  },
  {
    installs: 9488,
    country: 'United Kingdom',
    cost: 16002,
    iso: 'UK',
    revenue: 11978,
  },
  {
    installs: 11394,
    country: 'Japan',
    cost: 12495,
    iso: 'JP',
    revenue: 17564,
  },
  {
    installs: 700,
    country: 'Belgium',
    cost: 1500,
    iso: 'BE',
    revenue: 622,
  },
  {
    installs: 863,
    country: 'Brazil',
    cost: 423,
    iso: 'BR',
    revenue: 511,
  },
  {
    installs: 11033,
    country: 'China',
    cost: 14392,
    iso: 'CN',
    revenue: 1500,
  },
  {
    installs: 4520,
    country: 'Germany',
    cost: 7520,
    iso: 'DE',
    revenue: 8300,
  },
  {
    installs: 200,
    country: 'Hungary',
    cost: 350,
    iso: 'HU',
    revenue: 100,
  },
  {
    installs: 200,
    country: 'Finland',
    cost: 390,
    iso: 'FI',
    revenue: 500,
  },
] as const;
