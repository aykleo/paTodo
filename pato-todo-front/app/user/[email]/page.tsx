"use client";

import DeleteTodoModal from "@/components/TodoModals/deleteTodoModal";
import EditTodoModal from "@/components/TodoModals/editTodoModal";
import EditTodoStatusModal from "@/components/TodoModals/editTodoStatusModal";
import {
  SortingStatus,
  Todo,
  TodoStatus,
  useTodos,
} from "@/lib/context/todoContext";
import { CheckIcon, SettingsIcon, Trash2Icon } from "lucide-react";

import { useState } from "react";

export default function UserPage() {
  const { todos, sortingStatus } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const mapSortingStatusToTodoStatus = (
    sortingStatus: SortingStatus
  ): TodoStatus | null => {
    switch (sortingStatus) {
      case SortingStatus.PENDING:
        return TodoStatus.PENDING;
      case SortingStatus.IN_PROGRESS:
        return TodoStatus.IN_PROGRESS;
      case SortingStatus.COMPLETED:
        return TodoStatus.COMPLETED;
      default:
        return null;
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen max-h-max w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.isArray(todos) &&
        todos &&
        todos
          .filter((todo) => {
            if (sortingStatus === SortingStatus.ALL) return true;
            const mappedStatus = mapSortingStatusToTodoStatus(sortingStatus);
            return mappedStatus !== null && todo.status === mappedStatus;
          })
          .sort(
            (a, b) =>
              new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          )
          .map((todo: Todo) => (
            <div
              key={todo.id + 1}
              className={`${
                todo.status === "COMPLETED" ? "opacity-75" : ""
              } p-4 rounded-md text-gray-200 border border-gray-500 flex items-center mt-24 ml-5 flex-col w-72 h-48 bg-neutral-950`}
            >
              <div className="flex items-center justify-stretch w-full">
                <div className="h-full w-full text-2xl truncate">
                  {todo.title}
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
                  {todo.status === "COMPLETED" && (
                    <div>
                      <CheckIcon className="text-green-600 hover:text-green-400 hover:scale-110" />
                    </div>
                  )}
                  {todo.status === "IN_PROGRESS" && (
                    <div className="text-yellow-400 text-xs hover:text-yellow-600 hover:scale-110">
                      IN PROGRESS
                    </div>
                  )}
                  {todo.status === "PENDING" && (
                    <div className="text-red-600 text-xs hover:text-red-700 hover:scale-110">
                      PENDING
                    </div>
                  )}
                </button>
              </div>

              <div className="w-full overflow-x-hidden overflow-y-auto h-72">
                {todo.description}
              </div>
              <div className="h-full w-full  flex justify-around items-center">
                <div className="flex items-center justify-start gap-x-4 w-1/2">
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
                    <Trash2Icon className="rounded-sm bg-black size-8 p-1 hover:bg-neutral-900" />
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
                    <SettingsIcon className="rounded-sm bg-black size-8 p-1 hover:bg-neutral-900" />
                  </button>
                </div>
                <div className=" text-gray-500 text-sm">
                  Due{" "}
                  {(() => {
                    const date = new Date(todo.dueDate);
                    date.setDate(date.getDate() + 1);

                    return date.toLocaleString("pt-Br", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    });
                  })()}
                </div>
              </div>
            </div>
          ))}

      {selectedTodo && selectedTodo && (
        <EditTodoStatusModal
          todoId={selectedTodo.id}
          currentStatus={selectedTodo.status}
        />
      )}
      {selectedTodo && selectedTodo && (
        <DeleteTodoModal
          todoId={selectedTodo.id}
          todoTitle={selectedTodo.title}
          todoStatus={selectedTodo.status}
          todoDueDate={selectedTodo.dueDate}
        />
      )}
      {selectedTodo && selectedTodo && (
        <EditTodoModal
          todoId={selectedTodo.id}
          currentTitle={selectedTodo.title}
          currentDescription={selectedTodo.description}
          currentDueDate={selectedTodo.dueDate}
          currentStatus={selectedTodo.status}
        />
      )}
    </div>
  );
}
