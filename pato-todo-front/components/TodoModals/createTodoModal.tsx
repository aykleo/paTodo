"use client";

import { todoValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import {
  Calendar1Icon,
  LoaderIcon,
  StickyNoteIcon,
  TextIcon,
  XIcon,
} from "lucide-react";
import { useAuth } from "@/lib/context/authContext";
import { useTodos } from "@/lib/context/todoContext";

export default function CreateTodoModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const { addTodo } = useTodos();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoValidation),
  });

  const onSubmit = async (data: FieldValues) => {
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
        const newTodo = await response.json();

        addTodo(newTodo);

        const modal = document.getElementById("create_todo_modal");
        if (modal instanceof HTMLDialogElement) {
          modal.close();
        }
      } else {
        console.error("Failed to create todo");
      }
    } catch (error) {
      console.error("Error during todo creation:", error);
      alert("An error occurred while creating todo.");
    } finally {
      setIsLoading(false);
    }

    console.log("Form data submitted:", data);
  };

  return (
    <dialog id="create_todo_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0  flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="h-96 w-96 flex items-center justify-center text-white">
          <div className="max-w-md mx-auto p-6 bg-neutral-900 shadow-md rounded-lg border border-gray-400 shadow-black">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-4xl font-semibold mb-4">New To Do</h2>
              <form method="dialog">
                <button>
                  <XIcon className="text-white size-8 bg-black hover:bg-neutral-950 rounded-md" />
                </button>
              </form>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium ">
                  Title
                </label>
                <div className="mt-1 p-2 w-full border flex items-center border-gray-300 rounded-md focus-within:ring-2 focus-within::ring-cyan-500">
                  <StickyNoteIcon />
                  <input
                    id="title"
                    type="text"
                    {...register("title")}
                    className="bg-transparent focus:outline-none px-1 w-full"
                  />
                </div>

                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {(errors.title as FieldError).message}
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
                <div className="mt-1 p-2 w-full border h-48 flex items-start border-gray-300 rounded-md focus-within:ring-2 focus-within::ring-cyan-500">
                  <TextIcon />
                  <textarea
                    id="description"
                    {...register("description")}
                    className="bg-transparent focus:outline-none px-1 h-full scroll w-full"
                  />
                </div>

                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {(errors.description as FieldError).message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium ">
                  Due date
                </label>
                <div className="mt-1 p-2 w-full border flex items-center border-gray-300 rounded-md focus-within:ring-2 focus-within::ring-cyan-400">
                  <Calendar1Icon />
                  <input
                    id="dueDate"
                    type="date"
                    {...register("dueDate")}
                    className="bg-transparent focus:outline-none px-1 w-full"
                  />
                </div>

                {errors.dueDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {(errors.dueDate as FieldError).message}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="border flex items-center justify-center h-full w-full text-xl rounded-md p-2 text-gray-200 bg-black border-gray-600 hover:bg-zinc-950 focus:outline outline-cyan-400"
                >
                  {!isLoading ? (
                    "CREATE"
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
