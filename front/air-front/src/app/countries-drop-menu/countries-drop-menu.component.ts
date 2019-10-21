import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';
import { PlainMapComponent, myMap } from '../plain-map/plain-map.component';

export interface Countries {
  code: string;
  name: string;
}
export interface Pollution {
  longitude: number;
  latidude: number;
  city: string;
  location: string;
  element: string;
  period: string[];
}

export interface Polluants {
  code: string;
  name: string;
}
export let obj = { };
declare var ymaps: any;
@Component({
  selector: 'app-countries-drop-menu',
  templateUrl: './countries-drop-menu.component.html',
  styleUrls: ['./countries-drop-menu.component.scss']
})
export class CountriesDropMenuComponent implements OnInit {
  selectedCountry: string;
  selectedPolluant: string;
  mapObject = new PlainMapComponent();
  currentYear: number;


  constructor(private countriesService: CountriesService) {}

  public countries: Countries[];
  public pollutionInfo: Pollution[];
  public polluants: Polluants[];
  public megaPolluant;
  private circlesArr: any[];
  private colors;
  public positionOnSelectedCountry() {
    console.log(this.currentYear);
    const mygeo = ymaps.geocode(this.selectedCountry);
    countryCode = this.countries.filter((country) => country.name === this.selectedCountry)[0].code;
    this.deleteCircles(this.circlesArr);
    this.colors = {
      bc: '/assets/point1.svg',
      co: '/assets/point2.svg',
      no2: '/assets/point3.svg',
      o3: '/assets/point4.svg',
      pm10: '/assets/point5.svg',
      pm25: '/assets/point6.svg',
      so2: '/assets/point7.svg',
    };
    this.countriesService.getPollutionLevels(countryCode).subscribe(megadata => {
      this.drawCircles(megadata);
    });
    mygeo.then(
      res => {
        myMap.setCenter(res.geoObjects.get(0).geometry.getCoordinates());
      },
      err => {
        alert('Error');
      }
    );
  }

  public dispatchObject() {
    console.log(this.polluants);
    console.log(this.selectedPolluant);
  // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.polluants.length; i++) {
    if (this.polluants[i].code === this.selectedPolluant) {
      obj[this.polluants[i].code] = 1;
    } else {
      obj[this.polluants[i].code] = 0;
    }
    obj[31] = this.currentYear;
    console.log(obj);
  }
}

public predictPollut() {
  obj[31] = '2020';
  console.log(JSON.stringify(obj));
  fetch('https://ml-api-air.herokuapp.com/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  mode: 'no-cors',
  body: JSON.stringify(obj)
}).then(res => {
  console.log('Request complete! response:', res);
});


  this.countriesService.getPrediction();
  console.log(this.megaPolluant);
}



  public drawCircles(data) {
    this.circlesArr = [];

    for (const row of data) {
    const placemark = new ymaps.Placemark([row.lat, row.long], {
      iconContent: '1',
      balloonContent: `${row.value} µg/m3 of ${row.element}. City: ${row.city}. Location: ${row.location}`
    }, {
      iconLayout: 'default#image',
      iconImageHref: this.colors[row.element],
      iconImageSize: [50, 50]
  });

    this.circlesArr.push(placemark);
    myMap.geoObjects.add(placemark);
    }
  }

  public deleteCircles(circlesArr) {
    if (circlesArr !== undefined) {
      for (const circle of circlesArr) {
        myMap.geoObjects.remove(circle);
      }
    }
  }

ngOnInit() {
    this.countriesService.getConfig().subscribe(data => {
      this.countries = data;
      console.log(this.countries);
    });
    this.countriesService.getPolluants().subscribe(polluantData => {
      this.polluants =  polluantData;
      console.log(this.polluants);
  });
}
}

export let countryCode: string;
