import jwt from "jsonwebtoken";

/**
 * Retrieves user information from the server using the provided token.
 *
 * @return {Promise<Object>} The user information as an object, or an empty array if an error occurs.
 */
const getUser = async () => {
  const SECRETKEY = process.env.SECRETKEY;
  const token = localStorage.getItem("authToken");
  try {
    const decoded = jwt.verify(token, ""+SECRETKEY);
    const userId = decoded.userId;
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export default getUser;
