import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import Leaflet from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
@ViewChild('map') mapContainer: ElementRef;
 mapa: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
      //this.loadmap();
  }

  ionViewDidEnter() {
    this.loadmap();
  }

  loadmap() {
    this.mapa = Leaflet.map("map").fitWorld();
    Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.mapa);
    this.mapa.locate({
      setView: true,
      maxZoom: 17
    }).on('locationfound', (e) => {
      let markerGroup = Leaflet.featureGroup();
      let marker: any = Leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      })
      this.cargaruta(e.latitude,e.longitude);
      markerGroup.addLayer(marker);
      this.mapa.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
 
  }

  cargaruta(latitud, longuitud){

    Leaflet.Routing.control({
      waypoints: [
          Leaflet.latLng(latitud, longuitud),
          Leaflet.latLng(-0.1836298, -78.4821206)
      ],
      routeWhileDragging: true,
      showAlternatives: true,
      //geocoder: Leaflet.Control.Geocoder.nominatim()
    }).addTo(this.mapa).hide();

  }


}
