import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import UserPanel from "./components/Login";

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<UserPanel />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
