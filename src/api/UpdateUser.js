import jwt from "jsonwebtoken";



const onHandleUpdate = async (userUpdateData) => {
    try {
      const token = localStorage.getItem("authToken");
      const decoded = jwt.verify(token, "miClaveSecreta");
      const userId = decoded.userId;
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(userUpdateData),
      });

      if (response.ok) {
        setUpdateProfile(false);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

const onHandleUpdatePassword = async () => {
    try {
      if (password123 !== passwordConfirm123) {
        alert("Las contraseñas no coinciden");
        return;
      }
      const token = localStorage.getItem("authToken");
      const decoded = jwt.verify(token, "miClaveSecreta");
      const userId = decoded.userId;
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ password: password123 }),
      });

      if (response.ok) {
        setUpdatePassword(false);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  export { onHandleUpdate, onHandleUpdatePassword };