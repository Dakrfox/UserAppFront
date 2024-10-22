/**
 * Asynchronous function for user authentication.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @return {Promise} A Promise representing the authentication response.
 */
export default async function LoginAuth(email, password) {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 200) {
      const data = await response.json();
      const token = data.token;
      document.cookie = `token=${token}`;
      localStorage.setItem("authToken", token);
    } else {
      return response;
    }
    return response;
  } catch (error) {
    console.error(error);
  }
}
