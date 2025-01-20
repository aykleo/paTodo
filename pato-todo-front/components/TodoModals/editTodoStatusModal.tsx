import React from "react";

interface EditTodoStatusModalProps {
  todoId?: string;
  currentStatus?: string;
  newStatus?: string;
  setNewStatus: React.Dispatch<React.SetStateAction<string>>;
  handleStatusChange: (todoId: string, status: string) => void;
}

export default function EditTodoStatusModal({
  todoId,
  currentStatus,
  newStatus,
  setNewStatus,
  handleStatusChange,
}: EditTodoStatusModalProps) {
  return (
    <dialog id="edit_todo_status_modal" className="modal">
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="bg-neutral-900 border border-cyan-400 text-white p-6 rounded-md w-64">
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
              onClick={() => handleStatusChange(todoId, newStatus)}
              className="bg-cyan-500 hover:bg-cyan-600 p-2 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
