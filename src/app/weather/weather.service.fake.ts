import { Observable, of } from 'rxjs';

import { ICurrentWeather } from '../interfaces';
import { IWeatherService } from './weather.service';

export const fakeWeather: ICurrentWeather = {
  city: 'Bethesda',
  country: 'US',
  date: 1485789600,
  image: '',
  temperature: 280.32,
  description: 'light intensity drizzle',
};
export class WeatherServiceFake implements IWeatherService {
  getCurrentWeatherByCoords(coords: { latitude: number; longitude: number; }): Observable<ICurrentWeather> {
    return of(fakeWeather);;
  }
  public getCurrentWeather(
    city: string,
    country: string
  ): Observable<ICurrentWeather> {
    return of(fakeWeather);
  }
}
