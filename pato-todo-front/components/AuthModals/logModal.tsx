"use client";

import { userLoginValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import { AtSignIcon, LoaderIcon, LockKeyholeIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTodos } from "@/lib/context/todoContext";

export default function LogModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { getTodos } = useTodos();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userLoginValidation),
  });
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);

    try {
      const userData = {
        email: data.email,
        password: data.password,
      };

      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (response.ok) {
        const token = responseData.token;

        localStorage.setItem("authToken", token);

        await getTodos(token);
        const email = userData.email;

        router.push(`/user/${email}`);
      } else {
        alert(responseData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id="login_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0  flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="h-96 w-96 flex items-center justify-center text-white">
          <div className="max-w-md mx-auto p-6 bg-neutral-900 shadow-md rounded-lg border-gray-400">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-4xl font-semibold mb-4">Log In</h2>
              <form method="dialog">
                <button>
                  <XIcon className="text-white size-8 bg-black hover:bg-neutral-950 rounded-md" />
                </button>
              </form>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium ">
                  Email
                </label>
                <div className="mt-1 p-2 w-full border flex items-center border-gray-300 rounded-md focus-within:ring-2 focus-within::ring-cyan-500">
                  <AtSignIcon />
                  <input
                    id="login_email"
                    type="email"
                    {...register("email")}
                    className="bg-transparent focus:outline-none px-1 w-full"
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {(errors.email as FieldError).message}
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
                <div className="mt-1 p-2 w-full border flex items-center border-gray-300 rounded-md focus-within:ring-2 focus-within::ring-cyan-400">
                  <LockKeyholeIcon />
                  <input
                    id="login_password"
                    type="password"
                    {...register("password")}
                    className="bg-transparent focus:outline-none px-1 w-full"
                  />
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {(errors.password as FieldError).message}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="border flex items-center justify-center h-full w-full text-xl rounded-md p-2 text-gray-200 bg-black border-gray-600 hover:bg-zinc-950 focus:outline outline-cyan-400"
                >
                  {!isLoading ? (
                    "LOG IN"
                  ) : (
                    <LoaderIcon className="animate-spin" />
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
