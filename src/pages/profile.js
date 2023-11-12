import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import $ from 'jquery'; 



const Profile = () => {  
  let { id } = useParams();
  const [events, setEvents] = useState([
    {
      title: "Event 1",
      date: "2023-10-15",
    },
    {
      title: "Event 2",
      date: "2023-10-20",
    },
    // Add more events here
  ]);
  // Create a key that you can change to reset the component
  const [calendarKey, setCalendarKey] = useState(0);
  
  const resetCalendar = () => {
    // Change the key to reset the component
    setCalendarKey(calendarKey + 1);
  };
  // Define the map container's CSS style
  const mapStyles = {
    width: '100%',
    height: '500px',
  };
  const resetmapsize = () => {
    const map = new mapboxgl.Map({
      container: 'map-container', // This should match the id of the container element
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.4512, 43.6568],
      zoom: 8,
    });
    map.resize();
  }

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibGVnZW5kbWExMyIsImEiOiJjbGlmZmN3M2kwZXpmM2VxazYzNTJ2aWhjIn0.Bsv0Yor8qcTAgPczkGlPTQ';
    const map = new mapboxgl.Map({
      container: 'map-container', // This should match the id of the container element
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.4512, 43.6568],
      zoom: 8,
    });
    
    $.ajax({
      type: 'POST',
      url: 'http://localhost/server/functions.php',
      data: { getuserData: true, userID: id },
      success: function (response) {
        document.getElementById('userimg').src = response.message[0].profileimg;
        document.getElementById('user_email').innerText = response.message[0].name;
        document.getElementById('user_status').innerText = response.message[0].status;
        document.getElementById('user_program').innerText = response.message[0].status;
        document.getElementById('user_history').innerText = response.message[0].status;
      },
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
    <main className="d-flex justify-content-center align-items-center">
      <div className="container py-5 h-custom">
        <div className="row">
          <div className="col-lg-4 mb-3">
            <div className="card">
              <div className="card-body">
                <img
                  id="userimg"
                  className="img-fluid"
                  src="https://th.bing.com/th/id/R.6ae74c5f86466ef4f6fc6253c767381a?rik=5DSgIRvIaK7UPw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-Avatar-PNG.png&ehk=GVMh4KTpyOBERsOt5H%2b8TcGp%2bS8DdbR6niBs54kRaYA%3d&risl=&pid=ImgRaw&r=0" ></img>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-break"><b>Name: <span id="user_email"></span></b></li>
                  <li className="list-group-item text-break"><b>Registration status: <span id="user_status"></span></b></li>
                  <li className="list-group-item text-break"><b>Program you joined: <span id="user_program"></span></b></li>
                  <li className="list-group-item text-break"><b>History of program you join: <span id="user_history"></span></b></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <header>
              <ul className="nav nav-tabs d-flex justify-content-end" id="navId" role="tablist">
                <li className="nav-item">
                  <a href="#Hometab" className="nav-link active" data-bs-toggle="tab" aria-current="page">Home</a>
                </li>
                <li className="nav-item" role="presentation">
                  <a href="#Appointment-Tab" onClick={resetCalendar} className="nav-link" data-bs-toggle="tab">Appointment</a>
                </li>
                <li className="nav-item" role="presentation">
                  <a href="#Map-tab" onClick={ resetmapsize } className="nav-link" data-bs-toggle="tab">Maps</a>
                </li>
                <li className="nav-item" role="presentation">
                  <a href="#Notification-tab" className="nav-link" data-bs-toggle="tab">Notification</a>
                </li>
              </ul>
            </header>
            <div className="tab-content mt-3" id="myTabContent">
              <div className="tab-pane fade show active" id="Hometab" role="tabpanel">
                <div className="mb-3">
                  <div className="card">
                    <div className="card-header">
                      <h1 className="text-uppercase text-dark">Sikat saka program (SSP)</h1>
                    </div>
                    <div className="card-body">
                      <small className="text-dark">Current Program</small>
                      <p className="text-dark">
                        The Sikat Saka Program is an integrated financing program jointly
                        implemented by the Department of Agriculture and Land Bank of the
                        Philippines- The program aims to help more palay and corn farmers
                        access timely. adequate, and affordable production credit and improve
                        the viability ot agricultural production by ensuring availability ot irrigation
                        services. extension. links to markets and providing a favorable economic
                        environment
                      </p>
                    </div>
                    <div className="card-footer text-end">
                      <a href="#">View Full Details</a>
                    </div>
                  </div> <br></br>
                  <span className="">Old Program</span>
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={2}
                    navigation
                    pagination={{ clickable: true }}
                  >
                    <SwiperSlide>
                      <div className="card w-100 h-100" aria-hidden="true">
                        <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/></svg>
                        <div className="card-body">
                          <div className="h5 card-title placeholder-glow">
                            <span className="placeholder col-6"></span>
                          </div>
                          <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                          </p>
                          <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="card w-100 h-100" aria-hidden="true">
                        <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/></svg>
                        <div className="card-body">
                          <div className="h5 card-title placeholder-glow">
                            <span className="placeholder col-6"></span>
                          </div>
                          <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                          </p>
                          <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="card w-100 h-100" aria-hidden="true">
                        <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/></svg>
                        <div className="card-body">
                          <div className="h5 card-title placeholder-glow">
                            <span className="placeholder col-6"></span>
                          </div>
                          <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                          </p>
                          <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="card w-100 h-100" aria-hidden="true">
                        <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/></svg>
                        <div className="card-body">
                          <div className="h5 card-title placeholder-glow">
                            <span className="placeholder col-6"></span>
                          </div>
                          <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                          </p>
                          <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                        </div>
                      </div>
                    </SwiperSlide>
                    {/* Add more slides as needed */}
                  </Swiper>
                </div>
              </div>
              <div className="tab-pane fade" id="Appointment-Tab" role="tabpanel">
                <div className="card">
                  <div className="card-body">
                    <FullCalendar
                      key={calendarKey}
                      plugins={[dayGridPlugin]}
                      initialView="dayGridMonth"
                      events={events}
                    />  
                  </div>
                </div>
                
              </div>
              <div className="tab-pane fade" id="Map-tab" role="tabpanel">
                <div className="card">
                  <div className="card-body">
                    <div id="map-container" style={mapStyles}></div>  
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="Notification-tab" role="tabpanel">
                <div className="list-group">
                  <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" aria-current="true">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1 placeholder w-100">Heading</h5>
                      <small className="text-muted"></small>
                    </div>
                    <p className="mb-1 placeholder">lorajsbdjavdahjsvdhagsdvahsgdvasghdvashdgvasdhjvasd</p> <br></br>
                    <small className="placeholder">paragraph footer</small>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" aria-current="true">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1 placeholder w-100">Heading</h5>
                      <small className="text-muted"></small>
                    </div>
                    <p className="mb-1 placeholder">Paragraph</p> <br></br>
                    <small className="placeholder">paragraph footer</small>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" aria-current="true">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1 placeholder w-100">Heading</h5>
                      <small className="text-muted"></small>
                    </div>
                    <p className="mb-1 placeholder">Paragraph</p> <br></br>
                    <small className="placeholder">paragraph footer</small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
