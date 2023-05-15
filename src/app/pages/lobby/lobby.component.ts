import { Component, OnInit } from '@angular/core';
import { WorldMapMarker, WorldMapSettings } from 'src/app/shared/models/world-map-settings.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  settings: WorldMapSettings = new WorldMapSettings();

  constructor() {}

  ngOnInit() {
    const markers: WorldMapMarker[] = [
      { lat: 40.7128, lon: -74.0060 }, // New York City, USA
      { lat: 34.0522, lon: -118.2437 }, // Los Angeles, USA
      { lat: 51.5074, lon: -0.1278 }, // London, United Kingdom
      { lat: 48.8566, lon: 2.3522 }, // Paris, France
      { lat: 35.6895, lon: 139.6917 }, // Tokyo, Japan
      { lat: 39.9042, lon: 116.4074 }, // Beijing, China
      { lat: 28.6139, lon: 77.2090 }, // Delhi, India
      { lat: 19.0760, lon: 72.8777 }, // Mumbai, India
      { lat: 31.5204, lon: 74.3587 }, // Lahore, Pakistan
      { lat: -23.5505, lon: -46.6333 }, // Sao Paulo, Brazil
      { lat: 41.8781, lon: -87.6298 }, // Chicago, USA
      { lat: 24.8607, lon: 67.0011 }, // Karachi, Pakistan
      { lat: 34.3416, lon: 108.9398 }, // Xi'an, China
      { lat: 37.5665, lon: 126.9780 }, // Seoul, South Korea
      { lat: -33.9249, lon: 18.4241 }, // Cape Town, South Africa
      { lat: -34.6037, lon: -58.3816 }, // Buenos Aires, Argentina
      { lat: 59.9139, lon: 10.7522 }, // Oslo, Norway
      { lat: 55.6761, lon: 12.5683 }, // Copenhagen, Denmark
      { lat: -31.9505, lon: 115.8605 }, // Perth, Australia
      { lat: 52.5200, lon: 13.4050 }, // Berlin, Germany
    ];

    this.settings = new WorldMapSettings(markers);
  }
}
