import Land from "./components/land.component";
import './App.css';
import Base from './components/base.component'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import React from 'react'
import axios from 'axios'
import './App.css'
import { useState, createContext } from 'react'
export const UserContext = createContext(null)

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

function App() {

  const [imgUrls, setImageUrls] = useState([])
  const [signFlag, setSignFlag] = useState(false)
  const [useremail, setUserEmail] = useState('')

  if (localStorage.jwtToken) setAuthToken(localStorage.jwtToken)

  return (

    <UserContext.Provider value={{ imgUrls, setImageUrls, signFlag, setSignFlag, useremail, setUserEmail }}>
      <Router>
        <Routes>
          <Route path="/base" element={<Base />} />
          <Route path="/home" element={<Land />} />
          <Route path="/*" element={<Land />} />
        </Routes>
      </Router>
    </UserContext.Provider >
  );
}

export default App;
