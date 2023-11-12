import React from "react";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for routing
import Header from './components/Header';
import Footer from './components/Footer';

import Landing from './pages/landing'; // Adjust the path as needed
import Enroll from './pages/enroll'; // Adjust the path as needed
import Yourlocation from './pages/yourlocation'; // Adjust the path as needed
import Profile from './pages/profile'; // Adjust the path as needed

import PageNotFound from './pages/404';

import "./style/style.scss";

const App = () => {  
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/yourlocation" element={<Yourlocation />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/not-found" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
