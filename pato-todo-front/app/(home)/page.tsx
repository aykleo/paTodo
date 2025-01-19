import LogModal from "@/components/AuthModals/logModal";
import RegisterModal from "@/components/AuthModals/registerModal";
import OpenModalButton from "@/components/openModalButton";

export default function HomePage() {
  return (
    <div className="bg-zinc-900 h-screen w-screen flex items-center justify-center">
      <OpenModalButton modalId="register_modal">REGISTER</OpenModalButton>
      <RegisterModal />
      <LogModal />
    </div>
  );
}
