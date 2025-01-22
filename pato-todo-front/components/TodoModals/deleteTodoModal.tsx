import { useAuth } from "@/lib/context/authContext";
import { useTodos } from "@/lib/context/todoContext";
import React from "react";

interface DeleteTodoModalProps {
  todoId?: number;
  todoTitle?: string;
  todoStatus?: string;
  todoDueDate?: Date;
}

export default function DeleteTodoModal({
  todoId,
  todoTitle,
  todoStatus,
  todoDueDate,
}: DeleteTodoModalProps) {
  const { token } = useAuth();
  const { todos, updateTodos } = useTodos();

  const handleDeleteTodo = async (todoId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3333/deleteTodo/${todoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedTodos = todos.filter((todo) => todo.id !== todoId);
        updateTodos(updatedTodos);

        const modal = document.getElementById("delete_todo_modal");
        if (modal instanceof HTMLDialogElement) {
          modal.close();
        }
      } else {
        console.error("Failed to delete todo from database");
      }
    } catch (error) {
      console.error("Error during todo deletion:", error);
      alert("An error occurred while deleting todo.");
    }
  };

  return (
    <dialog id="delete_todo_modal" className="modal">
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="bg-neutral-900 border shadow-black rounded-lg border-gray-400 flex flex-col p-4 gap-y-6 w-72">
          <h3 className="font-semibold text-xl flex flex-col items-center gap-y-2 w-full">
            <span className=" font-bold text-white uppercase">{todoTitle}</span>
            <span
              className={`font-bold ${
                todoStatus === "COMPLETED" && "text-green-600"
              } ${todoStatus === "IN_PROGRESS" && "text-yellow-500"} ${
                todoStatus === "PENDING" && "text-red-600"
              }`}
            >
              {todoStatus === "COMPLETED" && "COMPLETED"}
              {todoStatus === "IN_PROGRESS" && "IN PROGRESS"}
              {todoStatus === "PENDING" && "PENDING"}
            </span>
            <span className="font-bold text-gray-300">
              Due on {""}
              {todoDueDate
                ? new Date(todoDueDate).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : "No due date"}
            </span>
            <span className="block text-lg text-center mx-auto text-red-500">
              ARE YOU SURE YOU WANT TO DELETE IT?
            </span>
          </h3>
          <div className="flex justify-between">
            <button
              onClick={() => {
                const modal = document.getElementById("delete_todo_modal");
                if (modal instanceof HTMLDialogElement) {
                  modal.close();
                }
              }}
              className="bg-gray-200 hover:bg-gray-400 text-black p-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (todoId) {
                  handleDeleteTodo(todoId);
                }
              }}
              className="border flex items-center justify-center text-xl rounded-md p-2 text-gray-200 bg-black border-gray-600 hover:bg-zinc-950 focus:outline outline-cyan-400"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
