"use client";

interface OpenModalButtonProps {
  className?: string;
  children?: React.ReactNode;
  modalId?: string;
  onClick?: React.Dispatch<React.SetStateAction<string>>;
}

const OpenModalButton = ({
  className,
  children,
  modalId,
  onClick,
}: OpenModalButtonProps) => {
  return (
    <>
      <button
        className={className}
        onClick={() => {
          if (modalId) {
            const dialog = document.getElementById(
              modalId
            ) as HTMLDialogElement;
            if (dialog) {
              dialog.showModal();
            }
            if (onClick) {
              onClick("");
            }
          }
        }}
      >
        {children}
      </button>
    </>
  );
};
export default OpenModalButton;
