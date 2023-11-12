import { useState } from 'react';
import $ from 'jquery'; 
import mySvg from '../images/logo.svg';
const Enroll = () => {

  const [imageDataUri, setImageDataUri] = useState(''); // To store the image data URI
  
  const uploadImg = () => {
    const profileimg = document.querySelector('#profileimg');
    const previewImageBtn = document.querySelector('#previewImageBtn');
    const previewImage = document.querySelector('#previewImage');
    
    profileimg.click();
    profileimg.addEventListener('change', function() {
      const selectedFile = profileimg.files[0];
      if (selectedFile) {
        // Create a FileReader object.
        const reader = new FileReader();

        // Set up an event handler to be called when the file is loaded.
        reader.onload = function(event) {
          // Set the image data URI in state.
          setImageDataUri(event.target.result);
          
          previewImageBtn.classList.add('d-none');
          previewImage.classList.remove('d-none');
          previewImage.src = event.target.result;
          // Now you can log the updated imageDataUri.
        };

        // Read the selected file as a data URL (data URI).
        reader.readAsDataURL(selectedFile);
      }
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Create a new FormData object using the form element with the id 'enrollform'.
    const formData = new FormData(document.getElementById('enrollform'));
    formData.append("enroll", true);
    $.ajax({
      type: "POST",
      url: "http://localhost/server/functions.php",
      data: formData,
      processData: false,
      contentType: false,
      success: function (res) {
        if(res.status === 500) {
          console.log("error")
          $.confirm({
            title: 'Failed!',
            content: res.message,
            type: 'red',
            buttons: {
              Close: function () {
              }
            }
          });
        } else {
          $.confirm({
            title: 'Success!',
            content: res.message,
            backgroundDismiss: false,
            theme: 'modern',
            closeIcon: false,
            type: 'green',
            buttons: {
              Continue: function () {
                window.location = "./yourlocation";
              }
            }
          });
        }
      }
    }); 
  }
  return (
    <form onSubmit={handleSubmit} id='enrollform' method='POST' className="otherpage p-3 page-break">
      <div className="mb-3">
        <div className="d-flex justify-content-around">
          <div className="d-flex align-items-center">
            <img src={mySvg} alt="My SVG Image" width={150} height={150} className='mb-3 me-4'/>
            <div>
              <h2 className="text-dark">ANI AT KITA <br></br> RSBSA ENROLLMENT FORM</h2>
              <small className="fw-bold">REGISTRY SYSTEM FOR BASIC SECTORS IN AGRICULTURE (RSBSA)</small>
            </div>
          </div>
          <button type='button' onClick={uploadImg} id="previewImageBtn" className="picture bg-transparent border border-2 shadow">
            <div className="">
              <h5>2x2 <br></br> PICTURE</h5>
              <small>PHOTO TAKEN <br></br> WITHIN 6 MONTHS</small>
            </div>
          </button>
          <img alt="uploaded image" id='previewImage' className='picture d-none'/>
          <input type="file" id="profileimg" name="profileimg" accept="image/*" hidden required></input>
        </div>
      </div>
      <div className="border border-2 border-dark form-bg">
        <div className="bg-dark text-white px-2 fw-bold">PART 1: PERSONAL INFORMATION</div>
        <div className="row py-3">
          <div className="col text-center">
            <input className="w-100 input-text" type="text" name="surname"></input>
            <small className="fw-bold text-uppercase">surname <span className="text-danger">*</span></small>
          </div>
          <div className="col text-center">
            <input className="w-100 input-text" type="text" name="fname"></input>
            <small className="fw-bold text-uppercase">first name <span className="text-danger">*</span></small>
          </div>
        </div>
        <div className="row py-3">
          <div className="col text-center">
            <input className="w-100 input-text" type="text" name="mname"></input>
            <small className="fw-bold text-uppercase">middle name <span className="text-danger">*</span></small>
          </div>
          <div className="col text-center">
            <input className="w-100 input-text" type="text" name="ename"></input>
            <small className="fw-bold text-uppercase">extension name</small>
          </div>
          <div className="col d-flex justify-content-evenly align-items-center fw-bold">
            <span className="text-uppercase"><span className="text-danger">*</span>sex:</span>
            <label className="form-check">
              <input className="form-check-input" type="radio" value="Male" name="gender" required></input>
              &nbsp;
              Male
            </label>
            <label className="form-check">
              <input className="form-check-input" type="radio" value="Female" name="gender" required></input>
              &nbsp;
              Female
            </label>
          </div>
        </div>
        <div className="w-100 bg-dark line"></div>
        <div className="row py-3">
          <span className="fw-bold text-uppercase">location<span className="text-danger">*</span></span>
          <div className="col-4 text-center">
            <input className="w-100 input-text" type="text" name="house" required></input>
            <small className="fw-bold text-uppercase">house/lot/bldg. no./purok</small>
          </div>
          <div className="col-4 text-center">
            <input className="w-100 input-text" type="text" name="street" required></input>
            <small className="fw-bold text-uppercase">street/sitio/subdv</small>
          </div>
          <div className="col-4 text-center">
            <input className="w-100 input-text" type="text" name="barangay" required></input>
            <small className="fw-bold text-uppercase">barangay</small>
          </div>
          <div className="col-4 text-center">
            <input className="w-100 input-text" type="text" name="municipal" required></input>
            <small className="fw-bold text-uppercase">municipality/city</small>
          </div>
          <div className="col-4 text-center">
            <input className="w-100 input-text" type="text" name="province" required></input>
            <small className="fw-bold text-uppercase">province</small>
          </div>
          <div className="col-4 text-center">
            <input className="w-100 input-text" type="text" name="region" required></input>
            <small className="fw-bold text-uppercase">region</small>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-lg-5 col-md-6 col-sm-6">
            <div className="row">
              <div className="col-6">
                <label className="fw-bold text-uppercase">Mobile Number<span className="text-danger">*</span>:</label>
                <input className="w-100 input-text" type="number" name="mobile" required></input>
              </div>
              <div className="col-6">
                <label className="fw-bold text-uppercase">Landline Number<span className="text-danger">*</span>:</label>
                <input className="w-100 input-text" type="number" name="landline"></input>
              </div>
              <div className="col-6">
                <label className="fw-bold text-uppercase">Date of Birth<span className="text-danger">*</span></label>
                <input className="w-100 input-text" type="date" name="dateOfBirth" required></input>
              </div>
              <div className="col-6">
                <label className="fw-bold text-uppercase">Place of birth<span className="text-danger">*</span></label>
                <input className="w-100 input-text" type="text" name="placeOfBirth" required></input>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-6 col-sm-6">
            <span className="fw-bold text-uppercase">Highest formal education:</span>
            <div className="row">
              <div className="col-lg-4">
                <label className="form-check">
                  <input className="form-check-input" value="Pre-school" type="radio" name="education" required></input>
                  &nbsp;
                  Pre-school
                </label>
                <label className="form-check">
                  <input className="form-check-input" value="Elementary" type="radio" name="education" required></input>
                  &nbsp;
                  Elementary
                </label>
                <label className="form-check">
                  <input className="form-check-input" value="High School (non K-12)" type="radio" name="education" required></input>
                  &nbsp;
                  High School (non K-12)
                </label>
              </div>
              <div className="col-lg-4">
                <label className="form-check">
                  <input className="form-check-input" value="Junior High School (K-12)" type="radio" name="education" required></input>
                  &nbsp;
                  Junior High School (K-12)
                </label>
                <label className="form-check">
                  <input className="form-check-input" value="Senior High School (K-12)" type="radio" name="education" required></input>
                  &nbsp;
                  Senior High School (K-12)
                </label>
                <label className="form-check">
                  <input className="form-check-input" value="College" type="radio" name="education" required></input>
                  &nbsp;
                  College
                </label>
              </div>
              <div className="col-lg-4">
                <label className="form-check">
                  <input className="form-check-input" value="Vocational" type="radio" name="education" required></input>
                  &nbsp;
                  Vocational
                </label>
                <label className="form-check">
                  <input className="form-check-input" value="Post-graduate" type="radio" name="education" required></input>
                  &nbsp;
                  Post-graduate
                </label>
                <label className="form-check">
                  <input className="form-check-input" value="None" type="radio" name="education" required></input>
                  &nbsp;
                  None
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end my-3">
          <a href="./" type="button" className="btn btn-lg btn-light fw-bold fs-4 mx-2 rounded rounded-pill shadow border border-3 px-5">Back</a>
          {/* <button type="submit" className="btn btn-lg btn-light fw-bold fs-4 mx-2 rounded rounded-pill shadow border border-3 px-5" onClick={window.print}>Done</button> */}
          <button type="submit" className="btn btn-lg btn-light fw-bold fs-4 mx-2 rounded rounded-pill shadow border border-3 px-5">Done</button>
        </div>
      </div>
    </form>
  )
}

export default Enroll