"use client";

import { todoValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Calendar1Icon, StickyNoteIcon, TextIcon, XIcon } from "lucide-react";
import { useAuth } from "@/lib/context/authContext";
import { useTodos } from "@/lib/context/todoContext";

enum TodoStatus {
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
}

interface UpdateTodoModalProps {
  todoId: number;
  currentTitle: string;
  currentDescription: string;
  currentStatus: TodoStatus;
  currentDueDate: Date;
}

export default function UpdateTodoModal({
  todoId,
  currentTitle,
  currentDescription,
  currentStatus,
}: UpdateTodoModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const { todos, updateTodos } = useTodos();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoValidation),
  });

  useEffect(() => {
    setValue("title", currentTitle);
    setValue("description", currentDescription);
  }, [currentTitle, currentDescription, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const todoData = {
        title: data.title,
        description: data.description,
        status: currentStatus,
        dueDate: new Date(data.dueDate).toISOString(),
      };

      const response = await fetch(
        `http://localhost:3333/updateTodo/${todoId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(todoData),
        }
      );

      if (response.ok) {
        const updatedTodo = await response.json();

        const updatedTodos = todos.map((todo) =>
          todo.data.id === todoId ? { ...todo, data: updatedTodo } : todo
        );

        updateTodos(updatedTodos);

        const todosInLocalStorage = JSON.parse(
          localStorage.getItem("todos") || "[]"
        );
        const updatedTodosInLocalStorage = todosInLocalStorage.map((todo) =>
          todo.id === todoId ? { ...todo, data: updatedTodo } : todo
        );
        localStorage.setItem(
          "todos",
          JSON.stringify(updatedTodosInLocalStorage)
        );

        alert("Todo updated successfully!");

        const modal = document.getElementById("edit_todo_modal");
        if (modal instanceof HTMLDialogElement) {
          modal.close();
        }
      } else {
        const errorText = await response.text();
        console.error("Failed to update todo:", errorText);
      }
    } catch (error) {
      console.error("Error during todo update:", error);
      alert("An error occurred while updating todo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id="edit_todo_modal" className="modal">
      <div className="remove-scrollbar fixed inset-0 flex items-center justify-center overflow-auto bg-black/25 backdrop-blur-sm">
        <div className="h-96 w-96 flex items-center justify-center text-white">
          <div className="max-w-md mx-auto p-6 bg-neutral-800 shadow-md rounded-lg">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-4xl font-semibold mb-4">
                Edit {currentTitle}
              </h2>
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
                  <StickyNoteIcon />
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
                <div className="mt-1 p-2 w-full border h-48 flex items-start border-gray-300 rounded-md focus-within:ring-2 focus-within::ring-cyan-500">
                  <TextIcon />
                  <textarea
                    id="description"
                    {...register("description")}
                    className="bg-transparent focus:outline-none px-1 h-full scroll w-full"
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
                  <Calendar1Icon />
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
                    "UPDATE"
                  ) : (
                    <span className="animate-spin">...</span>
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
