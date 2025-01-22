"use client";

import { useAuth } from "@/lib/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface OpenModalButtonProps {
  className?: string;
  children?: React.ReactNode;
  modalId?: string;
  onClick?: React.Dispatch<React.SetStateAction<string>>;
}

const OpenLogModalButton = ({ className }: OpenModalButtonProps) => {
  const { token, email, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token === undefined || email === undefined) {
      return;
    }

    if (!token) {
      router.push("/");
    } else {
      router.push(`/user/${email}`);
    }
  }, [token, email]);

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
