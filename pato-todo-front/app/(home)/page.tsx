import LogModal from "@/components/AuthModals/logModal";
import RegisterModal from "@/components/AuthModals/registerModal";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-zinc-900 h-screen w-screen flex items-center justify-center">
      <div className="flex items-center flex-col w-screen h-max gap-y-4">
        <div className="flex items-center flex-row relative w-full gap-x-4 h-full justify-center">
          <p className=" flex flex-col items-center font-astro text-5xl text-gray-300">
            paTODO
          </p>
          <div className="relative w-96">
            <div className="absolute rounded-full -bottom-40 right-7 z-10 bg-transparent shadow-lg shadow-black p-3 size-80" />

            <div className="absolute -bottom-44 -right-2 size-96 z-20">
              <Image
                src="/pato.png"
                alt="logo"
                width={400}
                height={400}
                quality={100}
                priority={true}
              />
            </div>
          </div>

          <p className=" flex flex-col items-center font-astro  text-5xl text-gray-300">
            TUCUPI
          </p>
        </div>
      </div>
      <RegisterModal />
      <LogModal />
    </div>
  );
}
