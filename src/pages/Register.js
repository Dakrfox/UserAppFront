"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { InputComponent, InputSubmit } from "@/components/InputComponent";
import CardComponent from "@/components/CardComponent";
import ContainerComponent from "@/components/ContainerComponent";
export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        // Handle successful login
        const token = data.token;

        localStorage.setItem("authToken", token);
        router.push("/User");
      } else {
        // Handle login failure
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });
      if (response.ok) {
        login(e);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <ContainerComponent className="flex justify-center items-center h-screen text-center">
        <CardComponent
          className="max-w-md mt-2 mb-2"
          title={"Let's get started"}
          image="https://img.logoipsum.com/243.svg"
        >
          <form onSubmit={handleSubmit}>
          <label htmlFor="email">Register</label>
            <InputComponent
              id="email"
              type="email"
              placeholder="Email"
              className="max-w-md mt-3 mb-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputComponent
              id="username"
              type="text"
              placeholder="Username"
              className="max-w-md mt-2 mb-2"
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputComponent
              id="password"
              type="password"
              placeholder="Password"
              className="max-w-md mt-2 mb-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputSubmit value="Register" className="max-w-md mt-2 mb-2" />
            <div className="text-center w-full  mt-2 mb-2">
              <Link
                className="text-blue-500 text-sm text-center w-full"
                href="/Login"
              >
                I have already an account
              </Link>
            </div>
          </form>
        </CardComponent>
      </ContainerComponent>
    </>
  );
}
