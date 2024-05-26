import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: email,
        password: password
      });

      if (response.status === 200) console.log('Usuario autenticado con éxito');
      console.log(response.data)
      setEmail('');
      setPassword('');

    } catch (error) {
      console.log(error);
      alert('Error al iniciar sesión');
    }
  }
  return (
    <>
      <div className="login-page">
        <h1>Welcome to your User Panel</h1>
        <p>Esta es la página de inicio de tu aplicación. Puedes agregar contenido como enlaces a otras páginas, imágenes o cualquier información que consideres relevante para el usuario.</p>

        <h2>Formulario de ejemplo</h2>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" onClick={handleLogin}>Enviar</button>
          <Link to="/register">Create Account</Link>
      </div>
    </>
  );
}

export default Login;
