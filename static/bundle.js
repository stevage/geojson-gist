(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jshint esnext:true */
//var mapboxgl = require('mapbox-gl');
//var d3r = require('d3-request');


mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmFnZSIsImEiOiJGcW03aExzIn0.QUkUmTGIO3gGt83HiRIjQw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v9', //stylesheet location
    center: [144.97, -37.85], // starting position
    zoom: 6 // starting zoom
});
map.on('load', () => {

    if (window.location.hash) {
        //d3.json('https://gist.githubusercontent.com/' + window.location.hash, data => {
        map.addSource('geojson', {
            type: 'geojson',
            data: 'https://gist.githubusercontent.com/' + window.location.hash.replace('#', '') + '/raw'
        });
        map.addLayer({
            id: 'user-fill',
            source: 'geojson',
            type: 'fill',
            paint: {
                'fill-color': 'hsl(220,80%,80%)',
                'fill-outline-color': 'hsl(220,80%,40%)'
            },
            filter: ['==', '$type', 'Polygon']
        });
        map.addLayer({
            id: 'user-point-symbol',
            source: 'geojson',
            type: 'symbol',
            layout: {
                'icon-allow-overlap': true,
                'icon-image': '{marker-symbol}-15'
            },
            filter: ['all', ['==', '$type', 'Point'], ['has', 'marker-symbol']]
        });
        map.addLayer({
            id: 'user-point-nosymbol',
            source: 'geojson',
            type: 'circle',
            paint: {
                'circle-color': 'hsl(220,80%,60%)'
            },
            filter: ['all', ['==', '$type', 'Point'], ['!has', 'marker-symbol']]
        });
        map.addLayer({
            id: 'user-line',
            source: 'geojson',
            type: 'line',
            paint: {
                'line-color': 'hsl(190,80%,60%)',
                'line-width': {
                    stops: [[10, 1], [16, 5]]
                }
            },
            filter: ['==', '$type', 'LineString']
        });
    }
});

},{}]},{},[1]);
