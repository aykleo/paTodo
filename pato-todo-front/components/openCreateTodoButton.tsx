"use client";

import { useAuth } from "@/lib/context/authContext";
import { SortingStatus, useTodos } from "@/lib/context/todoContext";

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
            className="rounded-md border border-black h-8 px-3 py-1"
            onClick={() => {
              const dialog = document.getElementById(
                "create_todo_modal"
              ) as HTMLDialogElement;
              if (dialog) {
                dialog.showModal();
              }
            }}
          >
            NEW To Do
          </button>
          <select
            className="rounded-md border h-8 border-black px-3 py-1"
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
        <div></div>
      )}
    </>
  );
};
export default OpenCreateTodoButton;
