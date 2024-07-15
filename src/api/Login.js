
export default async function LoginAuth(email, password) {
  
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(response)
    if (response.status === 200) {
      const data = await response.json();
      const token = data.token;
      document.cookie = `token=${token}`;
      localStorage.setItem("authToken", token);
    }else{
      
      return response
    }
    return response;
  } catch (error) {
    console.error(error);
    
  }
}
