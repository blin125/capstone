import './styles/HorizontalLayout.css';
import './styles/NavbarComp.css';
import './styles/Sidebar.css';
import './styles/AddCourses.css';
import './styles/StudentView.css';
import Homepage from './pages/Homepage';
import Authentication from './pages/Authentication';
import Testpage from './pages/Testpage';
import NoAuth from './pages/NoAuth';
import Cart from './pages/Cart'
import AddCourses from './pages/AddCourses';
import Studentpage from './pages/Studentpage';
import ApplicationPage from './pages/ApplicationPage';
import MarkerSignUp from './pages/MarkerSignUp';

import NavbarComp from './components/NavbarComp';
import Sidebar from './components/Sidebar';
import { RequireAuthUser } from './components/RequireAuthUser';
import { RequireAuthCourseCoord } from './components/RequireAuthCourseCoord';
import { RequireAuthMarkerCoord } from './components/RequireAuthMarkerCoord';
import { RequireAuthCourseAndMarkCo } from './components/RequireAuthCourseAndMarkCo.js';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import Statuspage from './pages/Studentpage';
import ApplicantsPage from './pages/ApplicantsPage';
import AllApplicationsPage from './pages/AllAplicationsPage';


import { Amplify, Storage } from 'aws-amplify';
import EditCourses from './pages/EditCourses';


function App() {
  return (
    <Router>
      <Authenticator.Provider>
        <Routes>
          <Route path="/" element={<Navigate to="/home"/>}/>          
          <Route path="/home" element={<Homepage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/cart" element={<RequireAuthUser><Cart /></RequireAuthUser>} />
          <Route path="/application-status" element={<RequireAuthUser><Statuspage/></RequireAuthUser>}  />
          <Route path="/all-applications/:id" element={<RequireAuthMarkerCoord><ApplicantsPage/></RequireAuthMarkerCoord>} />
          <Route path="/all-applications" element={<RequireAuthMarkerCoord><AllApplicationsPage/></RequireAuthMarkerCoord>} />
          <Route path="/edit-courses" element={<RequireAuthCourseAndMarkCo><EditCourses/></RequireAuthCourseAndMarkCo>} />
          <Route path="/addcourses" element={<RequireAuthMarkerCoord><AddCourses /></RequireAuthMarkerCoord>} />
          <Route path="/notauthorised" element={<NoAuth/>} />
          <Route path="/application-form" element={<RequireAuthUser><ApplicationPage /></RequireAuthUser>} />
          <Route path="/markersignup" element={<RequireAuthMarkerCoord><MarkerSignUp /></RequireAuthMarkerCoord>} />
        </Routes>
      </Authenticator.Provider>
    </Router>
  );
}
export default App;