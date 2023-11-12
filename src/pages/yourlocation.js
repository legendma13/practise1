import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';

const Yourlocation = () => {
  // Define the map container's CSS style
  const mapStyles = {
    width: '100%',
    height: '100vh',
  };
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibGVnZW5kbWExMyIsImEiOiJjbGlmZmN3M2kwZXpmM2VxazYzNTJ2aWhjIn0.Bsv0Yor8qcTAgPczkGlPTQ';
    const map = new mapboxgl.Map({
      container: 'map-container', // This should match the id of the container element
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.4512, 43.6568],
      zoom: 8,
    });
  
    // Given a query in the form "lng, lat" or "lat, lng"
    // returns the matching geographic coordinate(s)
    // as search results in carmen geojson format
    const coordinatesGeocoder = function (query) {
      // Match anything which looks like
      // decimal degrees coordinate pair.
      const matches = query.match(
        /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
      );
      if (!matches) {
        return null;
      }
  
      function coordinateFeature(lng, lat) {
        return {
          center: [lng, lat],
          geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          place_name: 'Lat: ' + lat + ' Lng: ' + lng,
          place_type: ['coordinate'],
          properties: {},
          type: 'Feature',
        };
      }
      const coord1 = Number(matches[1]);
      const coord2 = Number(matches[2]);
      const geocodes = [];
      if (coord1 < -90 || coord1 > 90) {
        // must be lng, lat
        geocodes.push(coordinateFeature(coord1, coord2));
      }
  
      if (coord2 < -90 || coord2 > 90) {
        // must be lat, lng
        geocodes.push(coordinateFeature(coord2, coord1));
      }
  
      if (geocodes.length === 0) {
        // else could be either lng, lat or lat, lng
        geocodes.push(coordinateFeature(coord1, coord2));
        geocodes.push(coordinateFeature(coord2, coord1));
      }
      return geocodes;
    };
  
    // Add the control to the map.
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: coordinatesGeocoder,
        zoom: 4,
        placeholder: 'Try: -40, 170',
        mapboxgl: mapboxgl,
        reverseGeocode: true,
      })
    );
  })
  
  return (
    <main>
      <div id="map-container" style={mapStyles}></div>
      <div className="d-flex justify-content-end m-4 position-absolute fixed-bottom">
        <button type="button" className="btn btn-lg btn-light fw-bold fs-4 mx-2 rounded rounded-pill shadow border border-3 px-5">Confirm</button>
        {/* <button type="submit" className="btn btn-lg btn-light fw-bold fs-4 mx-2 rounded rounded-pill shadow border border-3 px-5" onClick={window.print}>Done</button> */}
        <a href='./profile' className="btn btn-lg btn-light fw-bold fs-4 mx-2 rounded rounded-pill shadow border border-3 px-5">Done</a>
      </div>
    </main>
  );
};

export default Yourlocation;
