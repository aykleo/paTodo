"use client";

import { todoValidation } from "@/lib/validation";
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
import { useAuth } from "@/lib/context/authContext";
import { useTodos } from "@/lib/context/todoContext";

export default function CreateTodoModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const { updateTodos } = useTodos();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoValidation),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const todoData = {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
      };

      const response = await fetch("http://localhost:3333/createTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(todoData),
      });

      if (response.ok) {
        const getTodosResponse = await fetch("http://localhost:3333/getTodos", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const getTodosResponseText = await getTodosResponse.text();

        if (getTodosResponse.ok) {
          const todosData = JSON.parse(getTodosResponseText);
          updateTodos(todosData);

          alert("todo created successfully!");
        }
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
    <dialog id="create_todo_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0  flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="h-96 w-96 flex items-center justify-center text-white">
          <div className="max-w-md mx-auto p-6 bg-neutral-800 shadow-md rounded-lg">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-4xl font-semibold mb-4">New To Do</h2>
              <form method="dialog">
                <button>
                  <XIcon className="text-white size-8 bg-neutral-700 hover:bg-neutral-600 rounded-md" />
                </button>
              </form>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium ">
                  Title
                </label>
                <div className="mt-1 p-2 w-full border flex items-center border-gray-300 rounded-md focus-within:ring-2 focus-within::ring-cyan-500">
                  <UserIcon />
                  <input
                    id="title"
                    type="text"
                    {...register("title")}
                    className="bg-transparent focus:outline-none px-1 w-full"
                  />
                </div>

                {errors.title && (
                  <p className="text-cyan-200 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium "
                >
                  Description
                </label>
                <div className="mt-1 p-2 w-full border flex items-center border-gray-300 rounded-md focus-within:ring-2 focus-within::ring-cyan-500">
                  <AtSignIcon />
                  <input
                    id="description"
                    type="text"
                    {...register("description")}
                    className="bg-transparent focus:outline-none px-1 w-full"
                  />
                </div>

                {errors.description && (
                  <p className="text-cyan-200 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium ">
                  Due date
                </label>
                <div className="mt-1 p-2 w-full border flex items-center border-gray-300 rounded-md hover:ring-cyan-400 focus-within:ring-2 focus-within::ring-cyan-400">
                  <LockKeyholeIcon />
                  <input
                    id="dueDate"
                    type="date"
                    {...register("dueDate")}
                    className="bg-transparent focus:outline-none px-1 w-full"
                  />
                </div>

                {errors.dueDate && (
                  <p className="text-cyan-200 text-sm mt-1">
                    {errors.dueDate.message}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {!isLoading ? (
                    "CREATE"
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
