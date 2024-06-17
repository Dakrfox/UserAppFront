"use client";
import { useRouter, Redirect } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "next/link"; // Import the Link component
import jwt from "jsonwebtoken";
import { UserContext } from "../context/UserContext";
import MenuComponent, { MenuItem } from "@/components/MenuComponent";
import { HiArchiveBox } from "react-icons/hi2";
import ContainerComponent from "@/components/ContainerComponent";
import CardComponent from "@/components/CardComponent";
import { PrimaryBtn } from "@/components/ButtonComponent";
export default function User() {
  const { user, setUser } = useContext(UserContext);
  const secretKey = "miClaveSecreta";
  const Router = useRouter();
  const [userData, setUserData] = useState({});

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
          } else {
            console.error("Error:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
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

  console.log(user);
  return (
    <>
      <MenuComponent>
        <MenuItem icon={<HiArchiveBox size={20} />} text="Menu 1" active />
        <MenuItem icon={<HiArchiveBox size={20} />} text="Menu 2" />
        <MenuItem icon={<HiArchiveBox size={20} />} text="Menu 3" alert />
        <MenuItem icon={<HiArchiveBox size={20} />} text="Menu 4" />
      </MenuComponent>

      <ContainerComponent className="h-screen text-center w-full">
        <div className="min-h-300 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-5 pl-20">
          <div className="min-h-300 lg:col-span-2 lg:row-span-2 ">
            <CardComponent title="Card 1" body="Body 1" />
          </div>
          <div className="min-h-300 lg:col-span-2 lg:row-span-2 lg:col-start-3 ">
            <CardComponent title="Card 2" body="Body 2" />
          </div>
          <div className="min-h-300 lg:row-span-3 lg:row-start-3 ">
            <CardComponent title="Card 3" body="Body 3" />
          </div>
          <div className="min-h-300 lg:col-span-2 lg:row-span-3 lg:row-start-3 ">
            <CardComponent title="Card 4" body="Body 4" />
          </div>
          <div className="min-h-300 lg:row-span-3 lg:col-start-4 lg:row-start-3 ">
            <CardComponent title="Card 5" body="Body 5" />
            <PrimaryBtn className="mt-4" value="Logout" onClick={onhandleLogout} >
            </PrimaryBtn>
          </div>
        </div>
      </ContainerComponent>
    </>
  );
}
