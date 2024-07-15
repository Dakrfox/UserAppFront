"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { InputComponent, InputSubmit } from "@/components/InputComponent";
import LoginAuth from "../api/Login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardComponent from "@/components/CardComponent";
import ContainerComponent from "@/components/ContainerComponent";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const succes_notify = (message="") => {
    
    toast.success(`User ${message} Successfully!`, {
      position: "bottom-right"
    });
  };
  
  const error_notify = (message="") => {
    toast.error(`${message}!`, {
      position: "bottom-right"
    });
  
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await LoginAuth(email, password);
    if (response.status === 200) {
      succes_notify("Logged in");
      router.push("/User");
    } else {
      error_notify("Login failed");
    }
  };
  return (
    <ContainerComponent className="flex justify-center items-center h-screen text-center">
      <CardComponent
        className="max-w-md"
        title="Welcome Back!"
        image="https://img.logoipsum.com/243.svg"
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="">
            Login
          </label>
          <InputComponent
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            className="max-w-md mt-3 mb-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputComponent
            id="password"
            type="password"
            placeholder="Password"
            className="max-w-md mt-2 mb-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputSubmit value="Login" className="max-w-md mt-2 mb-2" />
          <ToastContainer />
          <div className="text-center w-full  mt-2 mb-2">
            <Link
              className="text-blue-500 text-sm text-center w-full"
              href="/Register"
            >
              Create an account
            </Link>
          </div>
        </form>
      </CardComponent>
    </ContainerComponent>
  );
}
