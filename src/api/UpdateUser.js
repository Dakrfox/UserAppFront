import jwt from "jsonwebtoken";

/**
 * Asynchronous function to handle updating user data.
 *
 * @param {Object} userUpdateData - The data to update for the user.
 * @return {void}
 */
const onHandleUpdate = async (userUpdateData) => {
  try {
    const SECRETKEY = process.env.SECRETKEY;
    const token = localStorage.getItem("authToken");
    const decoded = jwt.verify(token, SECRETKEY);
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

/**
 * Asynchronous function to handle updating user password.
 *
 * @return {void}
 */
const onHandleUpdatePassword = async () => {
  const SECRETKEY = process.env.SECRETKEY;
  try {
    if (password123 !== passwordConfirm123) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const token = localStorage.getItem("authToken");
    const decoded = jwt.verify(token, SECRETKEY);
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

/**
 * Asynchronous function to handle updating the role of a user.
 *
 * @return {Promise<boolean>} A promise that resolves to true if the role update is successful, false otherwise.
 */
const onHandleUpdateRole = async () => {
  const SECRETKEY = process.env.SECRETKEY;
  const token = localStorage.getItem("authToken");
  const decoded = jwt.verify(token, SECRETKEY);
  const userId = decoded.userId;
  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ rol: "admin" }),
  });
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};
export { onHandleUpdate, onHandleUpdatePassword, onHandleUpdateRole };
