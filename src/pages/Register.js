"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { InputComponent, InputSubmit } from "@/components/InputComponent";
import CardComponent from "@/components/CardComponent";
import ContainerComponent from "@/components/ContainerComponent";
import dobToAge from "dob-to-age";
import LoginAuth from "@/api/Login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [phone, setPhone] = useState("");
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
    try {
      if (!name || !email || !username || !birthdate || !phone || !password) {
        error_notify("Please fill in all fields");
        return;
      }
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          username,
          birthdate,
          age: dobToAge(birthdate),
          phone,
          password,
        }),
      });
      if (response.ok) {
        succes_notify("Created");
        const loginResponse = await LoginAuth(email, password);
        if (loginResponse) {
          succes_notify("Logged in");
          router.push("/User");
        } else {
          error_notify();
        }
      } else {
        error_notify("User already exists");
      }
    } catch (error) {
      error_notify("Something went wrong");
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
              id="name"
              type="text"
              placeholder="Name"
              className="max-w-md mt-2 mb-2"
              onChange={(e) => setName(e.target.value)}
            />
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
              id="birthdate"
              type="date"
              placeholder="Birthdate"
              className="max-w-md mt-2 mb-2"
              onChange={(e) => setBirthdate(e.target.value)}
            />

            <InputComponent
              id="phone"
              type="text"
              placeholder="Phone"
              className="max-w-md mt-2 mb-2"
              onChange={(e) => setPhone(e.target.value)}
            />

            <InputComponent
              id="password"
              type="password"
              placeholder="Password"
              className="max-w-md mt-2 mb-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            
              
  
            <InputSubmit value="Register" className="max-w-md mt-2 mb-2 cursor-pointer"/>
            
            <ToastContainer />
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
