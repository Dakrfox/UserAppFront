"use client";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import getUser from "@/api/GetUser";
import { softDelete, hardDelete } from "@/api/DeleteUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "react-avatar";

import {
  onHandleUpdate,
  onHandleUpdatePassword,
  onHandleUpdateRole,
} from "@/api/UpdateUser";
//context
import { UserContext } from "../context/UserContext";
//icons
import { FaRegEdit } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { RiAdminLine } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { RiHome3Line } from "react-icons/ri";
import { GrLinkedin } from "react-icons/gr";

//components
import ContainerComponent from "@/components/ContainerComponent";
import CardComponent from "@/components/CardComponent";
import MenuComponent, { MenuItem } from "@/components/MenuComponent";

import dobToAge from "dob-to-age";

import {
  PrimaryBtn,
  SecondaryBtn,
  DangerBtn,
} from "@/components/ButtonComponent";
import { InputComponent } from "@/components/InputComponent";
export default function User() {
  const { user, setUser } = useContext(UserContext);
  const Router = useRouter();
  const succes_notify = (message = "") => {
    toast.success(`${message}!`, {
      position: "bottom-right",
    });
  };

  const error_notify = (message = "") => {
    toast.error(`${message}!`, {
      position: "bottom-right",
    });
  };
  const [userData, setUserData] = useState({});
  const [updateProfile, setUpdateProfile] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [password123, setPassword123] = useState("");
  const [passwordConfirm123, setPasswordConfirm123] = useState("");
  const [updateUser, setUpdateUser] = useState({
    name: "",
    username: "",
    email: "",
    birthdate: "",
    age: "",
    phone: "",
  });
  const [rol, setRol] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const handleInputChange = (event, setter) => {
    switch (event.target.id) {
      case "123312213":
        setter({ ...updateUser, name: event.target.value });
        break;
      case "username123":
        setter({ ...updateUser, username: event.target.value });
        break;
      case "email123":
        setter({ ...updateUser, email: event.target.value });
        break;
      case "phone123":
        setter({ ...updateUser, phone: event.target.value });
        break;
      case "password123":
        setter({ ...updateUser, password: event.target.value });
        break;
      default:
        break;
    }
  };
  //pasarlo a handleinputchange
  const handleInputChangeDate = (event) => {
    const selectedDate = new Date(event.target.value);
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    setUpdateUser({ ...updateUser, birthdate: formattedDate });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setUserData(data);
      setUser(data);
      setUpdateUser({
        name: data.name,
        username: data.username,
        email: data.email,
        birthdate: data.birthdate?.substring(0, 10),
        age: data.age,
        phone: data.phone,
      });
      setRol(data.rol);
      setUpdatedAt(data.updated_at);
    };

    fetchUser();
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      const TSlogin = jwt.decode(storedToken).TimeStamp;
      setLastLogin(new Date(TSlogin));
    }
    const expToken = () => {
      const token = localStorage.getItem("authToken");
      const expiration_date = jwt.decode(token, "miClaveSecreta").exp;
      setTimeout(
        () => {
          onhandleLogout();
        },
        (expiration_date - Date.now() / 1000) * 1000,
      );
    };
    expToken();
  }, []);

  const onhandleLogout = () => {
    localStorage.removeItem("authToken");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    Router.push("/Login");
  };

  const onHandleCancel = () => {
    setUpdateUser({
      name: userData.name,
      username: userData.username,
      email: userData.email,
      birthdate: userData.birthdate.substring(0, 10),
      age: userData.age,
      phone: userData.phone,
    });
    setUpdateProfile(false);
  };
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
        succes_notify("Profile Updated");
        setUpdateProfile(false);
      } else {
        error_notify("Something went wrong");
      }
    } catch (error) {
      error_notify("Something went wrong");
    }
  };
  const onHandleUpdatePassword = async () => {
    try {
      if (password123 !== passwordConfirm123) {
        error_notify("Passwords do not match");
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
        succes_notify("Password Updated");
        setUpdatePassword(false);
      } else {
        error_notify("Something went wrong");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      error_notify("Something went wrong");
      console.error("Error:", error);
    }
  };
  const onHandleCancelPwd = () => {
    setPassword123("");
    setPasswordConfirm123("");
    setUpdatePassword(false);
  };
  const onHandleDeactivateUser = async () => {
    const UserDelflag = await softDelete();
    if (UserDelflag) {
      succes_notify("User Deleted");
      onhandleLogout();
    } else {
      error_notify("Something went wrong");
      alert("Error al borrar usuario");
    }
  };

  const onHandleDeleteUser = async () => {
    const UserDelflag = await hardDelete();
    if (UserDelflag) {
      succes_notify("User Deleted");
      onhandleLogout();
    } else {
      error_notify("Something went wrong");
      alert("Error al borrar usuario");
    }
  };
  const onHandleAdminRole = async () => {
    const userRoleFlag = await onHandleUpdateRole();
    if (userRoleFlag) {
      succes_notify("Rol Updated");
      setRol("admin");
    } else {
      error_notify("Something went wrong");
      alert("Error al actualizar rol");
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-between">
        <MenuComponent>
          <a href="/">
            <MenuItem
              icon={<RiHome3Line size={20} />}
              text="Home"
              onClick={() => Router.push("/")}
            />
          </a>
          <a href="https://github.com/valentinocorrea/next-userapp">
            <MenuItem
              icon={<CgFileDocument size={20} />}
              text="Documentation"
            />
          </a>
          <a href="https://www.linkedin.com/in/dk-fox">
            <MenuItem icon={<GrLinkedin size={20} />} text="Contact Dev" />
          </a>
        </MenuComponent>

        <ContainerComponent className=" text-center w-full p-0 box-border">
          <div className="min-h-300 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4 p-20 mx-10">
            <div className="min-h-300 lg:row-span-2">
              <CardComponent
                className="text-left h-full"
                title={
                  <div className="w-full flex justify-between items-center m-0">
                    <h2 className="mb-2">TimeStamp</h2>{" "}
                    <div className="icon cursor-pointer"></div>
                  </div>
                }
                body="Body 5"
              >
                <h2 className="mb-2 text-lg text-left underline">Login:</h2>{" "}
                <p>{"" + lastLogin}</p> <hr />
                <h2 className="mb-2 text-lg text-left underline">
                  User Created at:{" "}
                </h2>
                {"" + new Date(userData.created_at)}
                <hr />
                <h2 className="mb-2 text-lg text-left underline">
                  User last Updated at:
                </h2>
                {"" + new Date(userData.updated_at)}
                <hr />
              </CardComponent>
            </div>
            <div className="min-h-300 lg:row-span-2">
              <CardComponent
                className="text-left h-full pt-0 mt-0"
                title={
                  <div className="w-full flex justify-between items-center m-0">
                    <h2 className="mb-2">User Information</h2>
                    <div
                      className={`icon cursor-pointer inline-flex items-center justify-around ${
                        updatePassword && "hidden"
                      }`}
                      onClick={() => setUpdatePassword(!updatePassword)}
                    >
                      <label className="mr-2 cursor-pointer">Edit </label>
                      <FaRegEdit />
                    </div>
                  </div>
                }
                body="Body 5"
              >
                <div className="text-lg mb-2">
                  <label>Password</label>
                  <InputComponent
                    id="password123"
                    type="password"
                    placeholder="**************"
                    disabled={updatePassword ? false : true}
                    value={updatePassword ? password123 : ""}
                    onChange={(e) => setPassword123(e.target.value)}
                  ></InputComponent>
                </div>
                <div className="text-lg mb-2  ">
                  <label>Confirm Password</label>
                  <InputComponent
                    id="passwordConfirm123"
                    placeholder="**************"
                    disabled={updatePassword ? false : true}
                    type="password"
                    value={updatePassword ? passwordConfirm123 : ""}
                    onChange={(e) => setPasswordConfirm123(e.target.value)}
                  ></InputComponent>
                </div>
                {updatePassword ? (
                  <div className="flex items-center ">
                    <SecondaryBtn
                      value={"Cancel"}
                      className={"mt-4 mb-4 mr-2"}
                      disabled={updatePassword ? false : true}
                      onClick={onHandleCancelPwd}
                    ></SecondaryBtn>
                    <PrimaryBtn
                      value={"Save"}
                      className={"mt-4 mb-4 ml-2"}
                      disabled={updatePassword ? false : true}
                      onClick={onHandleUpdatePassword}
                    ></PrimaryBtn>
                  </div>
                ) : (
                  ""
                )}
              </CardComponent>
            </div>
            <div className="min-h-300 lg:row-span-2 lg:col-start-1 lg:row-start-3 ">
              <CardComponent
                className={"h-full"}
                title={
                  <div className="w-full flex justify-between items-center m-0">
                    <h2 className="mb-2">Admin Panel</h2> <RiAdminLine />
                  </div>
                }
                body="Body 5"
              >
                <h2>Role: {rol === "admin" ? "Administrator" : "Standard"}</h2>
                <PrimaryBtn
                  className="mt-4"
                  value="Request admin Role"
                  onClick={onHandleAdminRole}
                  disabled={userData.rol === "admin" ? true : false}
                ></PrimaryBtn>

                {rol === "admin"
                  ? "if you are seen this message, it is because you already have admin role"
                  : ""}
              </CardComponent>
            </div>
            <div className="min-h-300 lg:row-span-2 lg:col-start-2 lg:row-start-3 ">
              <CardComponent
                className={"h-full"}
                title={
                  <div className="w-full flex justify-between items-center m-0">
                    <h2 className="mb-2">Security</h2> <IoIosWarning />
                  </div>
                }
                body="Body 5"
              >
                <SecondaryBtn
                  className="mt-4"
                  value="Logout"
                  onClick={onhandleLogout}
                ></SecondaryBtn>
                <PrimaryBtn
                  className="mt-4"
                  value="Deactivate User"
                  onClick={onHandleDeactivateUser}
                ></PrimaryBtn>
                <DangerBtn
                  className="mt-4"
                  value="Delete Account"
                  onClick={onHandleDeleteUser}
                ></DangerBtn>
              </CardComponent>
            </div>

            <div className="min-h-300 lg:row-span-4 lg:col-start-3 lg:row-start-1 ">
              <CardComponent
                title={
                  <div className="w-full flex justify-between items-center m-0">
                    <h2 className="mb-2">User Information</h2>
                    <div
                      className={`icon cursor-pointer inline-flex items-center justify-around ${
                        updateProfile && "hidden"
                      }`}
                      onClick={() => setUpdateProfile(!updateProfile)}
                    >
                      <label className="mr-2 cursor-pointer">Edit </label>
                      <FaRegEdit />
                    </div>
                  </div>
                }
                className={""}
              >
                <ContainerComponent className="flex justify-center items-center ">
                  <div className="flex flex-col justify-center items-center c left radius-2xl overflow-hidden">
                    <Avatar
                      name={updateUser.name}
                      size={180}
                      color="#7986cb"
                      round={"100%"}
                    />
                  </div>
                  <figcaption>id: {userData._id}</figcaption>
                </ContainerComponent>

                <div className="right text-left">
                  <ContainerComponent className="text-left flex justify-center w-200 h-200">
                    <div className="text-lg mb-2  ">
                      <label>Name</label>
                      <InputComponent
                        id="123312213"
                        type="text"
                        placeholder="Name"
                        disabled={updateProfile ? false : true}
                        value={updateUser.name}
                        onChange={(event) =>
                          handleInputChange(event, setUpdateUser)
                        }
                      ></InputComponent>
                    </div>
                    <div className="text-lg mb-2  ">
                      <label>Username</label>
                      <InputComponent
                        id="username123"
                        type="email"
                        placeholder="Username"
                        disabled={updateProfile ? false : true}
                        value={updateUser.username}
                        onChange={(event) =>
                          handleInputChange(event, setUpdateUser)
                        }
                      ></InputComponent>
                    </div>
                    <div className="text-lg mb-2  ">
                      <label>Email</label>
                      <InputComponent
                        id="email123"
                        type="email"
                        placeholder="Email"
                        disabled={updateProfile ? false : true}
                        value={updateUser.email}
                        onChange={(event) =>
                          handleInputChange(event, setUpdateUser)
                        }
                      ></InputComponent>
                    </div>
                    <div className="text-lg mb-2  ">
                      <label>Birthday</label>
                      <InputComponent
                        id="birthdate123"
                        type="date"
                        placeholder="DD/MM/YYYY"
                        disabled={updateProfile ? false : true}
                        value={updateUser.birthdate}
                        onChange={(event) => handleInputChangeDate(event)}
                      ></InputComponent>
                    </div>
                    <div className="text-lg mb-2  ">
                      <label>Age</label>
                      <InputComponent
                        id="age123"
                        type="text"
                        placeholder="Age"
                        disabled={true}
                        value={dobToAge(updateUser.birthdate)}
                      ></InputComponent>
                    </div>
                    <div className="text-lg mb-2  ">
                      <label>Phone</label>
                      <InputComponent
                        id="phone123"
                        type="text"
                        placeholder="Phone"
                        disabled={updateProfile ? false : true}
                        value={updateUser.phone}
                        onChange={(event) =>
                          handleInputChange(event, setUpdateUser)
                        }
                      ></InputComponent>
                    </div>
                    {updateProfile ? (
                      <div className="flex items-center ">
                        <SecondaryBtn
                          value={"Cancel"}
                          className={"mt-4 mb-4 mr-2"}
                          disabled={updateProfile ? false : true}
                          onClick={onHandleCancel}
                        ></SecondaryBtn>
                        <PrimaryBtn
                          value={"Save"}
                          className={"mt-4 mb-4 ml-2"}
                          disabled={updateProfile ? false : true}
                          onClick={() => {
                            onHandleUpdate(updateUser);
                          }}
                        ></PrimaryBtn>
                      </div>
                    ) : (
                      ""
                    )}
                  </ContainerComponent>
                </div>
              </CardComponent>
            </div>
          </div>

          <ToastContainer />
        </ContainerComponent>
      </div>
    </>
  );
}
