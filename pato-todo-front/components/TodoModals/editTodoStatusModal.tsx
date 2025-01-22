import { useAuth } from "@/lib/context/authContext";
import { Todo, useTodos } from "@/lib/context/todoContext";
import React, { useState } from "react";

interface EditTodoStatusModalProps {
  todoId?: number;
  currentStatus?: string;
}

export default function EditTodoStatusModal({
  todoId,
  currentStatus,
}: EditTodoStatusModalProps) {
  const { token } = useAuth();
  const { todos, updateTodos } = useTodos();
  const [newStatus, setNewStatus] = useState<string>("");

  const handleStatusChange = async (todoId: number, status: string) => {
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
          todo.id === todoId ? { ...todo, status } : todo
        );
        updateTodos(updatedTodos as Todo[]);

        const modal = document.getElementById("edit_todo_status_modal");
        if (modal instanceof HTMLDialogElement) {
          modal.close();
        }
      } else {
        console.error("Failed to update status in database");
        alert("Failed to update status in the database.");
      }
    } catch (error) {
      console.error("Error during status update:", error);
      alert("An error occurred while updating the status.");
    }
  };

  return (
    <dialog id="edit_todo_status_modal" className="modal">
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="bg-neutral-900 shadow-md shadow-black rounded-lg border border-gray-400 text-white p-6 w-64">
          <h3 className="text-lg font-semibold mb-4">Change status</h3>
          <select
            value={newStatus || currentStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full p-2 border rounded-md bg-black"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => {
                const modal = document.getElementById("edit_todo_status_modal");
                if (modal instanceof HTMLDialogElement) {
                  modal.close();
                }
              }}
              className="bg-gray-200 hover:bg-gray-400 text-black p-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => handleStatusChange(todoId!, newStatus!)}
              className="border flex items-center justify-center rounded-md p-2 text-gray-200 bg-black border-gray-600 hover:bg-zinc-950 focus:outline outline-cyan-400"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
