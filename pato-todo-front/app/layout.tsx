import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import OpenLogModalButton from "@/components/openLogModalButton";
import { AuthProvider } from "@/lib/context/authContext";
import { TodoProvider } from "@/lib/context/todoContext";
import OpenCreateTodoButton from "@/components/openCreateTodoButton";
import CreateTodoModal from "@/components/TodoModals/createTodoModal";

const inter = Inter({ subsets: ["latin"] });
export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - PaToDo",
    default: "PaToDo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <TodoProvider>
        <html lang="en">
          <body className={`${inter.className} antialiased`}>
            <div className="w-full h-14 fixed border-b border-gray-600 z-99 opacity-95 backdrop-blur-md bg-neutral-950 flex items-center justify-between px-6 py-2">
              <OpenCreateTodoButton />
              <OpenLogModalButton className="border rounded-md p-2 text-gray-200 text-sm bg-black border-gray-600 hover:bg-zinc-950" />
            </div>
            {children}
            <CreateTodoModal />
          </body>
        </html>
      </TodoProvider>
    </AuthProvider>
  );
}
