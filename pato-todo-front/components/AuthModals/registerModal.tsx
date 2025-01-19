"use client";

import { userRegisterValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AtSignIcon,
  LockKeyholeIcon,
  SplineIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterModal() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userRegisterValidation),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const userData = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      const response = await fetch("http://localhost:3333/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (response.ok) {
        const response = await fetch("http://localhost:3333/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const responseData = await response.json();

        if (response.ok) {
          localStorage.setItem("authToken", responseData.token);
          const email = userData.email;
          alert("User logged successfully!");
          router.push(`/user/${email}`);
        }
      } else {
        alert(responseData.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }

    console.log("Form data submitted:", data);
  };

  return (
    <dialog id="register_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0  flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="h-96 w-96 flex items-center justify-center text-white">
          <div className="max-w-md mx-auto p-6 bg-neutral-800 shadow-md rounded-lg">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-4xl font-semibold mb-4">Register</h2>
              <form method="dialog">
                <button>
                  <XIcon className="text-white size-8 bg-neutral-700 hover:bg-neutral-600 rounded-md" />
                </button>
              </form>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium "
                >
                  Username
                </label>
                <div className="mt-1 p-2 w-full border flex items-center border-gray-300 rounded-md focus-within:ring-2 focus-within::ring-cyan-500">
                  <UserIcon />
                  <input
                    id="username"
                    type="text"
                    {...register("username")}
                    className="bg-transparent focus:outline-none px-1 w-full"
                  />
                </div>

                {errors.username && (
                  <p className="text-cyan-200 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium ">
                  Email
                </label>
                <div className="mt-1 p-2 w-full border flex items-center border-gray-300 rounded-md focus-within:ring-2 focus-within::ring-cyan-500">
                  <AtSignIcon />
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="bg-transparent focus:outline-none px-1 w-full"
                  />
                </div>

                {errors.email && (
                  <p className="text-cyan-200 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium "
                >
                  Password
                </label>
                <div className="mt-1 p-2 w-full border flex items-center border-gray-300 rounded-md hover:ring-cyan-400 focus-within:ring-2 focus-within::ring-cyan-400">
                  <LockKeyholeIcon />
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="bg-transparent focus:outline-none px-1 w-full"
                  />
                </div>

                {errors.password && (
                  <p className="text-cyan-200 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium "
                >
                  Confirm Password
                </label>
                <div className="mt-1 p-2 w-full border flex items-center border-gray-300 rounded-md focus-within:ring-2 focus-within::ring-cyan-500">
                  <LockKeyholeIcon />
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    className="bg-transparent focus:outline-none px-1 w-full"
                  />
                </div>

                {errors.confirmPassword && (
                  <p className="text-cyan-200 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {!isLoading ? (
                    "REGISTER"
                  ) : (
                    <SplineIcon className="animate-spin" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}
