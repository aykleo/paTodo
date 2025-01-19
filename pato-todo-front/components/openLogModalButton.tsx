"use client";

import { useAuth } from "@/lib/context/authContext";

interface OpenModalButtonProps {
  className?: string;
  children?: React.ReactNode;
  modalId: string;
  onClick?: React.Dispatch<React.SetStateAction<string>>;
}

const OpenLogModalButton = ({ className }: OpenModalButtonProps) => {
  const { email, logOut } = useAuth();

  return (
    <>
      {email ? (
        <>
          <button
            className={className}
            onClick={() => {
              logOut();
            }}
          >
            Log off from {email}
          </button>
        </>
      ) : (
        <>
          <button
            className={className}
            onClick={() => {
              const dialog = document.getElementById(
                "login_modal"
              ) as HTMLDialogElement;
              if (dialog) {
                dialog.showModal();
              }
            }}
          >
            Login
          </button>
        </>
      )}
    </>
  );
};
export default OpenLogModalButton;
