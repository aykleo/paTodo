"use client";

const OpenCreateTodoButton = () => {
  return (
    <>
      <button
        className=""
        onClick={() => {
          const dialog = document.getElementById(
            "create_todo_modal"
          ) as HTMLDialogElement;
          if (dialog) {
            dialog.showModal();
          }
        }}
      >
        +
      </button>
    </>
  );
};
export default OpenCreateTodoButton;
