import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { injectSpy } from 'angular-unit-test-helper';
import { of } from 'rxjs';

import { MaterialModule } from '../material.module';
import { WeatherService } from '../weather/weather.service';
import { fakeWeather } from '../weather/weather.service.fake';
import { CurrentWeatherComponent } from './current-weather.component';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getCurrentWeather',
    ]);
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [CurrentWeatherComponent],
      providers: [
        {
          provide: WeatherService,
          useValue: weatherServiceSpy,
        },
      ],
    }).compileComponents();
    weatherServiceMock = injectSpy(WeatherService);

    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    weatherServiceMock.getCurrentWeather.and.returnValue(of());

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should get currentWeather from weatherService', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of());
    // Act
    fixture.detectChanges(); // triggers ngOnInit()
    // Assert
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1);
  });

  it('should eagerly load currentWeather in Bethesda from weatherService', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather));
    // Act
    fixture.detectChanges(); // triggers ngOnInit()
    // Assert
    expect(component.currentWeather).toBeDefined();
    expect(component.currentWeather.city).toEqual('Bethesda');
    expect(component.currentWeather.temperature).toEqual(280.32);
    // Assert on DOM
    const debugEl = fixture.debugElement;
    const titleEl: HTMLElement = debugEl.query(By.css('.mat-title')).nativeElement;
    expect(titleEl.textContent).toContain('Bethesda');
  });
});
