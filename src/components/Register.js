import React from 'react';

function Register() {
  return (
    <div className="Register-page">
       <h1>Create your User Account</h1>
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
        <label htmlFor="email">Username:</label>
        <input
          type="username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
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
  );
}

export default Register;
