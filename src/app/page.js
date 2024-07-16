"use client";
import Image from "next/image";
import Link from "next/link";
import { PrimaryBtn, SecondaryBtn } from "@/components/ButtonComponent";
import CardComponent from "@/components/CardComponent";
import getUser from "@/api/GetUser";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Asynchronously checks if a user exists by fetching the user data using the `getUser` function.
 * If the user exists, sets the `userExist` state to `true`.
 *
 * @return {Promise<void>} A promise that resolves when the check is complete.
 */
export default function Home() {
  const [userExist, setUserExist] = useState(false);
  const router = useRouter();
  /**
   * Asynchronously checks if a user exists by fetching the user data using the `getUser` function.
   * If the user exists, sets the `userExist` state to `true`.
   *
   * @return {Promise<void>} A promise that resolves when the check is complete.
   */
  const userFlag = async () => {
    const user = await getUser();
    if (user) {
      setUserExist(true);
    }
  };
  /**
   * Navigates to the login page.
   *
   * @return {void} No return value.
   */
  const goToLogin = () => {
    router.push("/Login");
  };
  /**
   * Navigates to the registration page.
   *
   * @return {void} No return value.
   */
  const goToRegister = () => {
    router.push("/Register");
  };
  /**
   * Navigates to the dashboard page.
   *
   * @return {void} No return value.
   */
  const goToDashboard = () => {
    router.push("/User");
  };

  useEffect(() => {
    userFlag();
  }, []);

  return (
    <main>
      <div className="h-300 pl-10 pr-10 grid grid-cols-2 fixed top-0 bg-white w-full">
        <div className="col-span-1">
          <Image
            src="https://img.logoipsum.com/243.svg"
            alt="Logo"
            width={250}
            height={250}
          />
        </div>
        <div className="col-span-1 inline-flex pl-10 pr-10 items-center justify-center">
          {!userExist ? (
            <SecondaryBtn
              className="mr-2 ml-5"
              value="Login"
              onClick={() => goToLogin()}
            ></SecondaryBtn>
          ) : null}

          <PrimaryBtn
            className="mr-5 ml-2"
            value={userExist ? "Go to Dashboard" : "Register"}
            onClick={userExist ? goToDashboard : goToRegister}
          ></PrimaryBtn>
        </div>
      </div>
      <div className="w-full bg-gray-100 pb-20 pl-20 pr-20">
        <div className="grid lg:grid-cols-3 lg:grid-rows-4 grid-cols-1  gap-4 lg:h-screen">
          <div className="lg:col-span-3 lg:row-span-2 mt-300 flex justify-center items-center">
            <div className={"text-center mt-20 bg-neutral-100 "}>
              <h1 className="text-5xl font-bold text-center text-indigo-600">
                Simple User Web Application
              </h1>
              <h2 className="text-2xl font-bold text-center text-indigo-400">
                with nextjs and tailwindcss
              </h2>
            </div>
          </div>
          <div className="lg:row-span-2 lg:row-start-3 ">
            <CardComponent
              title="Reusable code"
              className={"text-left text-indigo-600"}
            >
              <p className="text-left mb-2 text-black">
                This application is free on GitHub and can be used, improved and
                shared for both commercial and non-commercial use. This code is
                intended to be used in other projects to speed up the
                development process.
              </p>
              <a className="text-center text-blue-600 underline italic">
                Github Link
              </a>
            </CardComponent>
          </div>
          <div className="lg:row-span-2 lg:row-start-3">
            <CardComponent
              title="Wiki and Feedbacks"
              description="Card Description"
              className={"text-left text-indigo-600"}
            >
              <p className="text-left mb-2 text-black">
                In the github link there is a section you can use to learn more,
                send comments, bugs, suggestions, criticisms. The main idea is
                that this project can scale in all possible areas. This
                application also has a documentation that explains the
                functionalities and how it is built.
              </p>
              <a className="text-center text-blue-600 underline italic">
                Read Documentation
              </a>
            </CardComponent>
          </div>
          <div className="lg:row-span-2 lg:row-start-3 ">
            <CardComponent
              title="Privacy and Data treatment"
              description="Card Description"
              className={"text-left text-indigo-600"}
            >
              <p className="text-left mb-2 text-black">
                This application is intended for demonstrative purposes only.
                You are responsible for the information you submit to this
                website. As a suggestion we inform you not to enter personal
                data that may affect your well being, the application will not
                ask for verification of the data provided.
              </p>
            </CardComponent>
          </div>
        </div>
      </div>
      <footer className="bg-indigo-600 footer p-10 text-white footer-center">
        <h2 className="footer-title text-xl text-white  mb-4 font-bold text-center">
          User Web Application
        </h2>

        <div className="grid lg:grid-cols-2 grid-gap-3 grid-cols-1">
          <div className="col-span-1 m-5">
            <p className="footer-description mb-2">
              Simple web app that allows you to create, read, update, delete and
              authenticate you as a user, using JWT token, Espresso and
              React/Next.
            </p>
            <ul className="footer-links">
              <li>
                <a className="list underline text-md cursor-pointer" href="#">
                  Github Code
                </a>
              </li>
              <li>
                <a className="list underline text-md cursor-pointer" href="#">
                  LinkedIn dev
                </a>
              </li>
              <li>
                <a className="list underline text-md cursor-pointer" href="#">
                  Buy me a coffee
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1 m-5 ">
            <h3 class="footer-contact-title text-xl mb-2">Contact Us</h3>
            <p class="footer-contact-info">
              <span class="footer-contact-label">Email: </span>
              <a
                className="cursor-pointer "
                href="mailto:business.nimh@outlook.com"
              >
                business.nimh@outlook.com
              </a>
            </p>
            <p class="footer-contact-info">
              <span class="footer-contact-label">Telegram: </span>
              <a className="cursor-pointer" href="">
                @Dakrfox
              </a>
            </p>
            <p class="footer-contact-info">
              <span class="footer-contact-label">Dev Web Page: </span>
              <a className="cursor-pointer">Go to NiCode</a>
            </p>
          </div>
        </div>
        <div>
          <p className="footer-copyright text-center">
            Developer: Ing Nicolas Martinez Herrera{" "}
          </p>
        </div>
      </footer>
    </main>
  );
}
