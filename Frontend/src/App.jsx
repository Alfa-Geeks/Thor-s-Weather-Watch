import { useState } from 'react'
import Login from './Component/Login/Login'
import Signup from './Component/Signup/Signup'
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Home from './Component/Home/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <>
      <Router>
        <Routes>
        {/* <Route path="" element={<Home/>} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          {/* Protect Home route: only accessible if logged in */}
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/" />}
          />
          
          {/* If the user is logged in and goes to login, redirect to home */}
          <Route
            path="/home"
            element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
