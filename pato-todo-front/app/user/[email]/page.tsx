"use client";

import DeleteTodoModal from "@/components/TodoModals/deleteTodoModal";
import EditTodoModal from "@/components/TodoModals/editTodoModal";
import EditTodoStatusModal from "@/components/TodoModals/editTodoStatusModal";
import { useAuth } from "@/lib/context/authContext";
import { SortingStatus, useTodos } from "@/lib/context/todoContext";
import { CheckIcon, SettingsIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

enum TodoStatus {
  PENDING,
  IN_PROGRESS,
  COMPLETED,
}

interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: TodoStatus;
}

export default function UserPage() {
  const { token } = useAuth();
  const { todos, updateTodos, sortingStatus } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  const handleStatusChange = async (todoId: string, status: string) => {
    try {
      const response = await fetch(
        `http://localhost:3333/updateTodo/${todoId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        const updatedTodos = todos.map((todo) =>
          todo.data.id === todoId
            ? { ...todo, data: { ...todo.data, status } }
            : todo
        );
        updateTodos(updatedTodos);
        const modal = document.getElementById("edit_todo_status_modal");
        if (modal instanceof HTMLDialogElement) {
          modal.close();
        }
      } else {
        console.error("Failed to update status in database");
      }
    } catch (error) {
      console.error("Error during status update:", error);
      alert("An error occurred while updating status.");
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
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
        const updatedTodos = todos.filter((todo) => todo.data.id !== todoId);
        updateTodos(updatedTodos);

        alert("Todo deleted successfully!");

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
    <div className="bg-zinc-900 h-screen w-screen flex items-center justify-center gap-8">
      {Array.isArray(todos) &&
        todos
          .slice()
          .filter((todo) => {
            if (sortingStatus === SortingStatus.ALL) return true;
            return todo.data.status === SortingStatus[sortingStatus];
          })
          .sort(
            (a, b) =>
              new Date(a.data.dueDate).getTime() -
              new Date(b.data.dueDate).getTime()
          )
          .map((todo: Todo) => (
            <div
              key={todo.data.id}
              className={`${
                todo.data.status === "COMPLETED" ? "opacity-75" : ""
              } p-4 rounded-md text-white border flex items-center flex-col w-72 gap-y-3 h-48 bg-neutral-950`}
            >
              <div className="flex items-center justify-stretch w-full  relative">
                <div className="h-full w-full text-2xl truncate ">
                  {todo.data.title.charAt(0).toUpperCase() +
                    todo.data.title.slice(1)}
                </div>
                <button
                  onClick={() => {
                    setSelectedTodo(todo);
                    const dialog = document.getElementById(
                      "edit_todo_status_modal"
                    ) as HTMLDialogElement;
                    if (dialog) {
                      dialog.showModal();
                    }
                  }}
                >
                  {todo.data.status === "COMPLETED" && (
                    <div>
                      <CheckIcon className="text-green-600 hover:text-green-400 hover:scale-110" />
                    </div>
                  )}
                  {todo.data.status === "IN_PROGRESS" && (
                    <div className="text-yellow-400 text-xs hover:text-yellow-600 hover:scale-110">
                      IN PROGRESS
                    </div>
                  )}
                  {todo.data.status === "PENDING" && (
                    <div className="text-red-600 text-xs hover:text-red-700 hover:scale-110">
                      PENDING
                    </div>
                  )}
                </button>
              </div>

              <div className="w-full overflow-x-hidden overflow-y-auto h-96">
                {todo.data.description}
              </div>
              <div className="h-full w-full  flex justify-around items-center">
                <div className="flex items-center justify-evenly w-1/2 gap-x-6">
                  <button
                    onClick={() => {
                      setSelectedTodo(todo);
                      const dialog = document.getElementById(
                        "delete_todo_modal"
                      ) as HTMLDialogElement;
                      if (dialog) {
                        dialog.showModal();
                      }
                    }}
                  >
                    <Trash2Icon className="rounded-sm bg-neutral-900 size-8 p-1 hover:bg-neutral-800" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTodo(todo);
                      const dialog = document.getElementById(
                        "edit_todo_modal"
                      ) as HTMLDialogElement;
                      if (dialog) {
                        dialog.showModal();
                      }
                    }}
                  >
                    <SettingsIcon className="rounded-sm bg-neutral-900 size-8 p-1 hover:bg-neutral-800" />
                  </button>
                </div>
                <div className=" text-gray-500 text-sm">
                  Due{" "}
                  {new Date(todo.data.dueDate).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
      <button
        className="text-black"
        onClick={() => {
          localStorage.removeItem("toDoList");
          updateTodos([]);
        }}
      >
        DELETE TESTING
      </button>
      {selectedTodo && selectedTodo.data && (
        <EditTodoStatusModal
          todoId={selectedTodo.data.id}
          currentStatus={selectedTodo.data.status}
          newStatus={newStatus}
          setNewStatus={setNewStatus}
          handleStatusChange={handleStatusChange}
        />
      )}
      {selectedTodo && selectedTodo.data && (
        <DeleteTodoModal
          todoId={selectedTodo.data.id}
          todoTitle={selectedTodo.data.title}
          todoStatus={selectedTodo.data.status}
          todoDueDate={selectedTodo.data.dueDate}
          handleDeleteTodo={handleDeleteTodo}
        />
      )}
      {selectedTodo && selectedTodo.data && (
        <EditTodoModal
          todoId={selectedTodo.data.id}
          currentTitle={selectedTodo.data.title}
          currentDescription={selectedTodo.data.description}
          currentDueDate={selectedTodo.data.dueDate}
          currentStatus={selectedTodo.data.status}
        />
      )}
    </div>
  );
}
