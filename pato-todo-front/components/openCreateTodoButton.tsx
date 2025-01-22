"use client";

import { useAuth } from "@/lib/context/authContext";
import { SortingStatus, useTodos } from "@/lib/context/todoContext";
import OpenModalButton from "./openModalButton";

const OpenCreateTodoButton = () => {
  const { email } = useAuth();
  const { setSortingStatus, sortingStatus } = useTodos();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingStatus(Number(event.target.value));
  };

  return (
    <>
      {email ? (
        <div className="flex items-center gap-x-4">
          <button
            className="border rounded-md p-2 text-gray-200 text-sm bg-black border-gray-600 hover:bg-zinc-950"
            onClick={() => {
              const dialog = document.getElementById(
                "create_todo_modal"
              ) as HTMLDialogElement;
              if (dialog) {
                dialog.showModal();
              }
            }}
          >
            New To Do
          </button>
          <select
            className="border rounded-md p-2 text-gray-200 text-sm bg-black border-gray-600 hover:bg-zinc-950"
            value={sortingStatus}
            onChange={handleSortChange}
          >
            <option value={SortingStatus.ALL}>All</option>
            <option value={SortingStatus.PENDING}>Pending</option>
            <option value={SortingStatus.IN_PROGRESS}>In Progress</option>
            <option value={SortingStatus.COMPLETED}>Completed</option>
          </select>
        </div>
      ) : (
        <OpenModalButton
          className="border rounded-md p-2 text-gray-200 text-sm bg-black border-gray-600 hover:bg-zinc-950"
          modalId="register_modal"
        >
          Register
        </OpenModalButton>
      )}
    </>
  );
};
export default OpenCreateTodoButton;
