import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherService } from '../weather/weather.service';
import { CitySearchComponent } from './city-search.component';

describe('CitySearchComponent', () => {
  let component: CitySearchComponent;
  let fixture: ComponentFixture<CitySearchComponent>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getCurrentWeather',
    ]);
    await TestBed.configureTestingModule({

      declarations: [ CitySearchComponent ],
      providers: [
        {
          provide: WeatherService,
          useValue: weatherServiceSpy,
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
