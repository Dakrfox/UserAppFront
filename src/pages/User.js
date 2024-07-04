"use client";
import { useRouter, Redirect } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "next/link"; // Import the Link component
import jwt from "jsonwebtoken";
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
  const secretKey = "miClaveSecreta";
  const Router = useRouter();
  const [userData, setUserData] = useState({});
  const [updateProfile, setUpdateProfile] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);


  const [nameChange, setNameChange] = useState('n');

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    try {
      const decoded = jwt.verify(token, secretKey);

      const userId = decoded.userId;
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/users/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            setUser(data);
            setNameChange(data.email);

            console.log(data.name);
          } else {
            console.error("Error  aasdaasd:", response.statusText);
          }
        } catch (error) {
          console.error("Error asdasdasd:", error);
        }
      };
      fetchData();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        console.error("Token expired");
        {
          Router.push("/Login");
        }
      } else {
        console.error("Invalid token:", error.message);
        {
          Router.push("/Login");
        }
        // Handle other token errors (e.g., redirect to login)
      }
    }
  }, []);

  const onhandleLogout = () => {
    localStorage.removeItem("authToken");
    Router.push("/Login");
  };
  const handleCancel = () => {
    setNameChange(userData.email);
    setUpdateProfile(false);
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
                    <div className="icon cursor-pointer">
                      <FaRegEdit />
                    </div>
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
                    <h2 className="mb-2">Security</h2>{" "}
                    <div className="icon cursor-pointer">
                      <FaRegEdit />
                    </div>
                  </div>
                }
                body="Body 5"
              >
                <div className="text-lg mb-2">
                  <label>Password</label>
                  <InputComponent
                    placeholder="**************"
                    disabled={true}
                    type="password"
                  ></InputComponent>
                </div>
                <div className="text-lg mb-2  ">
                  <label>Confirm Password</label>
                  <InputComponent
                    placeholder="**************"
                    disabled={true}
                    type="password"
                  ></InputComponent>
                </div>
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
                ></PrimaryBtn>
                <DangerBtn className="mt-4" value="Delete Account"></DangerBtn>
              </CardComponent>
            </div>

            <div className="min-h-300 lg:row-span-4 lg:col-start-3 lg:row-start-1 ">
              <CardComponent
                title={
                  <div className="w-full flex justify-between items-center m-0">
                    <h2 className="mb-2">Profile Information</h2>
                    <div
                      className="icon cursor-pointer"
                      onClick={() => setUpdateProfile(!updateProfile)}
                    >
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
                        placeholder=""
                        disabled={updateProfile ? false : true}
                        value={updateProfile ? nameChange : userData.email}
                        onChange={(event) => handleInputChange(event, setNameChange)}
                      ></InputComponent>
                    </div>
                    <div className="text-lg mb-2  ">
                      <label>Username</label>
                      <InputComponent
                        value={userData.username}
                        disabled={updateProfile ? false : true}
                      ></InputComponent>
                    </div>
                    <div className="text-lg mb-2  ">
                      <label>Email</label>
                      <InputComponent
                        value={userData.email}
                        disabled={updateProfile ? false : true}
                                              ></InputComponent>
                    </div>
                    <div className="text-lg mb-2  ">
                      <label>Age</label>
                      <InputComponent
                        id="email"
                        type="email"
                        placeholder="Email"
                        disabled={updateProfile ? false : true} 
                        
                      ></InputComponent>
                    </div>
                    <div className="text-lg mb-2  ">
                      <label>Phone</label>
                      <InputComponent
                        value={""}
                        disabled={false}
                      ></InputComponent>
                    </div>
                    {updateProfile ? (
                      <div className="flex items-center ">
                        <SecondaryBtn
                          value={"Cancel"}
                          className={"mt-4 mb-4 mr-2"}
                          disabled={updateProfile ? false : true}
                          onClick={handleCancel}
                        ></SecondaryBtn>
                        <PrimaryBtn
                          value={"Save"}
                          className={"mt-4 mb-4 ml-2"}
                          disabled={updateProfile ? false : true}
                          onClick={() => {
                            alert("Saved");
                          }}
                          w
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
