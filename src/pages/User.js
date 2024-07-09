"use client";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import getUser from "@/api/GetUser";
import { softDelete, hardDelete } from "@/api/DeleteUser";
//context
import { UserContext } from "../context/UserContext";
//icons
import { HiArchiveBox } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { RiAdminLine } from "react-icons/ri";

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
import Image from "next/image";
import { InputComponent } from "@/components/InputComponent";
import { stringify } from "postcss";
export default function User() {
  const { user, setUser } = useContext(UserContext);
  const Router = useRouter();
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
    };

    fetchUser();
  }, []);

  const onhandleLogout = () => {
    localStorage.removeItem("authToken");
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
      console.log(userUpdateData);
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
  const onHandleCancelPwd = () => {
    setPassword123("");
    setPasswordConfirm123("");
    setUpdatePassword(false);
  };
  const onHandleDeactivateUser = async () => {
    const UserDelflag = await softDelete();
    if (UserDelflag) {
      onhandleLogout();
    } else {
      alert("Error al borrar usuario");
    }
  };

  const onHandleDeleteUser = async () => {
    const UserDelflag = await hardDelete();
    if (UserDelflag) {
      onhandleLogout();
    } else {
      alert("Error al borrar usuario");
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-between">
        <MenuComponent>
          <MenuItem icon={<HiArchiveBox size={20} />} text="Menu 1" active />
          <MenuItem icon={<HiArchiveBox size={20} />} text="Menu 2" />
          <MenuItem icon={<HiArchiveBox size={20} />} text="Menu 3" alert />
          <MenuItem icon={<HiArchiveBox size={20} />} text="Menu 4" />
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
                <h2>Session time: {"2 hrs 15 min 3 sec"}</h2>
                <h2>
                  Last login:{" "}
                  {"12/12/1212 12:12:12 PM" /*new Date(userData.lastLogin)*/}
                </h2>
                <h2>
                  last update:{" "}
                  {"12/12/1212 12:12:12 PM" /*new Date(userData.lastLogin)*/}
                </h2>
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
                    {...console.log(password123)}
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
                    {...console.log(passwordConfirm123)}
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
                <h2>
                  Role: {user.rol === "admin" ? "Administrator" : "Standard"}
                </h2>
                <PrimaryBtn
                  className="mt-4"
                  value="Request admin Role"
                ></PrimaryBtn>
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
                <DangerBtn className="mt-4" value="Delete Account"
                onClick={onHandleDeleteUser}></DangerBtn>
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
                <ContainerComponent className="flex justify-center items-center w-300 h-300">
                  <div className="flex flex-col justify-center items-center c left h-250 w-250 radius-2xl overflow-hidden">
                    <img
                      className="rounded-2xl h-full w-full object-cover object-center fill"
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                      alt="Image Description"
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
        </ContainerComponent>
      </div>
    </>
  );
}
