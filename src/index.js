var mapboxgljs = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken =
  'pk.eyJ1IjoiYmVlcHRjIiwiYSI6ImNpaDZzeTl6czA3cm11MWtpcmZjODhsMHAifQ.oZ9PBLwvwcMX7fBaHGDnAg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/basic-v9',
  center: [77.0688999, 28.5275198],
  zoom: 12
});

var direction = 0,
  manual = false,
  speed = 0.1;

var point = {
  type: 'Point',
  coordinates: [77.0688999, 28.5275198]
};

var source = new mapboxgl.GeoJSONSource({
  data: point
});

// create the popup
var popup = new mapboxgl.Popup({ offset: 25 }).setText(
  'This is a moving drone'
);

// create DOM element for the marker
var el = document.createElement('div');
el.id = 'marker';

function setPosition() {
  point.coordinates[0] += (speed * Math.sin(direction)) / 100;
  point.coordinates[1] += (speed * Math.cos(direction)) / 100;
  source.setData(point);
  if (!manual && Math.random() > 0.95) {
    direction += (Math.random() - 0.5) / 2;
  }
  new mapboxgljs.Marker(el)
    .setLngLat(point.coordinates)
    .setPopup(popup)
    .addTo(map);
}

map.on('style.load', function() {
  map.addSource('drone', source);

  map.addLayer({
    id: 'drone-glow-strong',

    type: 'circle',
    source: 'drone',
    paint: {
      'circle-radius': 18,
      'circle-color': '#00e673',
      'circle-opacity': 0.8
    }
  });

  window.setInterval(setPosition, 1000);
});
