import jwt from "jsonwebtoken";
/**
 * Async function to soft delete a user by making a PATCH request to the server.
 *
 * @return {boolean} True if the deletion was successful, false otherwise.
 */
const softDelete = async () => {
  const SECRETKEY = process.env.SECRETKEY;
  const token = localStorage.getItem("authToken");
  const decoded = jwt.verify(token, `${SECRETKEY}`);
  const response = await fetch(
    `http://localhost:3000/users/delete/${decoded.userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("authToken")}`,
      },
    },
  );
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

/**
 * Asynchronously performs a hard delete operation on a user by making a DELETE request to the server.
 *
 * @return {boolean} Returns true if the operation is successful, false otherwise.
 */
const hardDelete = async () => {
  const SECRETKEY = process.env.SECRETKEY;
  const token = localStorage.getItem("authToken");
  const decoded = jwt.verify(token, `${SECRETKEY}`);
  const response = await fetch(
    `http://localhost:3000/users/delete/hard/${decoded.userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("authToken")}`,
      },
    },
  );
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

export { softDelete, hardDelete };
