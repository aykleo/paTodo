import React from "react";

interface DeleteTodoModalProps {
  todoId?: string;
  todoTitle?: string;
  todoStatus?: string;
  todoDueDate?: string;
  handleDeleteTodo: (todoId: string) => void;
}

export default function DeleteTodoModal({
  todoId,
  todoTitle,
  todoStatus,
  todoDueDate,
  handleDeleteTodo,
}: DeleteTodoModalProps) {
  return (
    <dialog id="delete_todo_modal" className="modal">
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="bg-neutral-900 border border-cyan-400 text-white flex flex-col p-4 gap-y-6 rounded-md w-72">
          <h3 className="font-semibold text-xl flex flex-col items-center gap-y-2 w-full">
            <span className=" font-bold text-cyan-400 uppercase">
              {todoTitle}
            </span>
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
            <span className="font-bold text-gray-400">
              Due on {""}
              {new Date(todoDueDate).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
            <span className="block text-lg text-center mx-auto">
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
              className="bg-cyan-500 hover:bg-cyan-600 p-2 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
