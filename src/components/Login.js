import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log(`Email: ${email}, Password: ${password}`); 
    alert('Formulario enviado correctamente'); 
    setEmail(''); 
    setPassword('');
  };

  return (
    <>
    <div className="login-page">
      <h1>Welcome to your User Panel</h1>
      <p>Esta es la página de inicio de tu aplicación. Puedes agregar contenido como enlaces a otras páginas, imágenes o cualquier información que consideres relevante para el usuario.</p>

      <h2>Formulario de ejemplo</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Enviar</button>
        <Link to="/register">Create Account</Link>
      </form>
    </div>
    </>
  );
}

export default Login;
