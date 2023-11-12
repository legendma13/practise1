import React, { useEffect, useState, Component } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import $, { ajax, ajaxSetup } from 'jquery'; 
import 'jquery-confirm'; // add Jquery-confirm for alert design
import 'jquery-confirm/css/jquery-confirm.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// lightbox2
import 'lightbox2/dist/css/lightbox.min.css';
import 'lightbox2/dist/js/lightbox.min';
import mySvg from '../images/logo.svg';

// import required modules
const showConfirmation = () => {
  $.confirm({
    title: 'Confirm!',
    content: 'Are you sure you want to proceed?',
    buttons: {
      confirm: () => {
        // Handle the confirm action here
        console.log('Confirmed');
      },
      cancel: () => {
        // Handle the cancel action here
        console.log('Canceled');
      },
    },
  });
};

const Landing = () => {
  const [data, setData] = useState(null);
  // Function to perform the AJAX request
  const LoginFuntion = () => {
    $.ajax({
      type: 'POST',
      url: 'http://localhost/server/functions.php',
      data: { login: true },
      success: function (response) {
        setData(response);
      },
    });
  };
  // The AJAX request will be performed when the component mounts due to the empty dependency array in useEffect
  return (
    <>
      <main className='landingpage'>
        <div className="container">
          <div className='row'>
            <div className='col-lg-6 d-flex justify-content-center align-items-center'>
              <div className='card w-100 h-100 py-5'>
                <div className='card-body text-center d-flex justify-content-center'>
                  <div>
                    <img src={mySvg} alt="My SVG Image" className='mb-3'/>
                    <div className='mb-3'>
                      <input type='text' className='form-control text-center' placeholder='UserName'/>
                    </div>
                    <div className='mb-3'>
                      <input type='password' className='form-control text-center' placeholder='Password'/>
                    </div>
                    <div className='mb-3'>
                      <button type='button' onClick={showConfirmation} className='btn btn-warning w-100 mb-3 fw-bold'>LOG IN</button>
                      <p className='fw-bold text-shadow'>Don't have an account?&nbsp;<a href='/enroll'>Enroll now</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-6 d-flex justify-content-center align-items-center'>
              <div className='text-white text-shadow fw-bold'>
                <h1 className='text-shadow mb-4'>Department of Agriculture</h1>
                <h3 className='fw-bold'>Vision</h3>
                <p className='fs-5'>
                  A modernized smallholder agriculture and fisheries; 
                  a diversified rural economy that is dynamic, technologically 
                  advanced and internationally competitive. 
                  Its transformation is guided by the sound practices of resource sustainability, 
                  the principles of social justice, and a strong private sector participation. 
                </p>
                <h3 className='fw-bold'>Mission</h3>
                <p className='fs-5'>
                  To help and empower the farming and fishing communities and 
                  the private sector to produce enough, accessible and affordable 
                  food for every Filipino and a decent income for all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Landing