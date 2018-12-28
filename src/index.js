import _ from 'lodash';
import './style.scss';
// import marker from './marker.png';

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken =
  'pk.eyJ1Ijoia2FwaWxzaGFybWE5NCIsImEiOiJjanE3b201NGYyc2cxNDlzYml3OGMxeTE2In0.OV0ZS53ILT8K3y3SkeeqOA';

var newDelhi = [77.0688999, 28.5275198];

var map = new mapboxgl.Map({
  container: 'map',
  // style: 'mapbox://styles/mapbox/streets-v11'
  style: 'mapbox://styles/mapbox/basic-v9',
  zoom: 1,
  center: [77.0688999, 28.5275198]
});

var i = 0,
  j = 0,
  jsonObj = {},
  pos = [];
var geoLocations = [];
var lng = [],
  lat = [];
var geojson;

getRandomInRange(-90, 90, 3);

for (i = 0; i < 50; i++) {
  // console.log('[lng[i], lat[i]]: ', [lng[i], lat[i]]);
  geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng[i], lat[i]]
        },
        properties: {
          title: 'Mapbox'
        }
      }
    ]
  };
  geoLocations.push(geojson);
}

// console.log('geoLocations: ', geoLocations);
function createMarkers() {
  geoLocations.map(loc => {
    loc.features.map(marker => {
      // geoLocations.forEach(function(loc) {
      // loc.features.forEach(function(marker) {
      // loc.features.forEach(function(marker) {
      // console.log('marker: ', marker);
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.id = 'marker';
      console.log('Came here');
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
    });
  });
}

map.on('style.load', function() {
  console.log('Here');
  createMarkers();
  window.setInterval(setPosition, 1000);
});

function getRandomInRange(from, to, fixed) {
  for (i = 0; i < 100; i++) {
    pos.push((Math.random() * (to - from) + from).toFixed(fixed) * 1);
  }

  for (i = 0; i < 100; i++) {
    if (i < 50) lng[i] = pos[i];
    else lat[i - 50] = pos[i];
  }
}

var direction = 0,
  manual = false,
  speed = 0.1;

function setPosition() {
  console.log('Inside setPosition');
  // geoLocations.map(loc => {
  geoLocations.forEach(function(loc) {
    loc.features.forEach(function(marker) {
      // console.log('marker: ', marker);
      // create a HTML element for each feature
      // var el = document.createElement('div');
      // el.className = 'marker';
      marker.geometry.coordinates[0] += (speed * Math.sin(direction)) / 100;
      marker.geometry.coordinates[1] += (speed * Math.cos(direction)) / 100;
      // console.log('marker.geometry.coordinates: ', marker.geometry.coordinates);
      // make a marker for each feature and add to the map
      // new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
      // var el = document.createElement('div');
      // el.className = 'marker';

      // make a marker for each feature and add to the map
      // new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
    });
  });
  // console.log('geoLocations: ', geoLocations);
  // point.coordinates[0] += (speed * Math.sin(direction)) / 100;
  // point.coordinates[1] += (speed * Math.cos(direction)) / 100;
  // source.setData(point);

  if (!manual && Math.random() > 0.95) {
    direction += (Math.random() - 0.5) / 2;
  }
}
