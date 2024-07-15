import jwt from "jsonwebtoken";

const getUser = async () => {
  const secretKey = "miClaveSecreta";
  const token = window.localStorage.getItem("authToken");
  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
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
