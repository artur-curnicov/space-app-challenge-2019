import { Component, OnInit } from '@angular/core';

declare var ymaps: any;
export let myMap;

@Component({
  selector: 'app-plain-map',
  templateUrl: './plain-map.component.html',
  styleUrls: ['./plain-map.component.scss']
})
export class PlainMapComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    ymaps.ready().then(() => {
          myMap = new ymaps.Map('map', {
            center: [47.202356, 28.466093],
            zoom: 7,
            controls: ["zoomControl"]
          });
        });
    }
  }
