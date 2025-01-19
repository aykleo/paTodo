"use client";
import OpenCreateTodoButton from "@/components/openCreateTodoButton";
import CreateTodoModal from "@/components/TodoModals/createTodoModal";
import { useAuth } from "@/lib/context/authContext";

export default function UserPage() {
  const { id } = useAuth();
  return (
    <div className="bg-zinc-900 h-screen w-screen flex items-center justify-center">
      SEU ID E {id}
      <OpenCreateTodoButton />
      <CreateTodoModal />
    </div>
  );
}
