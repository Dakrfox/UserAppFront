import { useState, React } from 'react';
import { Link } from 'react-router-dom';
function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    alert('Formulario enviado correctamente');
    setEmail('');
    setPassword('');
  };


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
        <Link to="/register">I already have an account</Link>
      </form>
    </div>
  );
}

export default Register;
