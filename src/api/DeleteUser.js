import jwt from "jsonwebtoken";

const softDelete = async () => {
  const token = localStorage.getItem("authToken");
  const decoded = jwt.verify(token, "miClaveSecreta");
  const response = await fetch(
    `http://localhost:3000/users/delete/${decoded.userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("authToken")}`,
      },
    }
  );
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

const hardDelete = async () => {
  const token = localStorage.getItem("authToken");
  const decoded = jwt.verify(token, "miClaveSecreta");
  const response = await fetch(
    `http://localhost:3000/users/delete/hard/${decoded.userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("authToken")}`,
      },
    }
  );
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

export { softDelete, hardDelete };
