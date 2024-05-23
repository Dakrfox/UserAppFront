import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Import
import Login from './components/Login';
import Register from './components/Register';
import UserPanel from './components/UserPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Login component for root path */}
        <Route path="/register" element={<Register />} />  {/* Register component for /about path */}
        <Route path="/upanel" element={<UserPanel />} /> {/* upanel route for product details */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
