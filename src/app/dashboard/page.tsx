"use client";

import { CoachGuard } from "@/components/auth/coach-guard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

function DashboardPage() {
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b bg-card sticky top-0 z-20 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard del Coach</h1>
        <Button onClick={handleLogout} variant="outline">
          Cerrar Sesión
        </Button>
      </header>
      <main className="flex-1 p-8">
        <h2 className="text-xl mb-4">Bienvenido, Coach!</h2>
        <p>Aquí podrás gestionar los WODs de tus atletas.</p>
        {/* WOD management components will go here */}
      </main>
    </div>
  );
}

export default function GuardedDashboard() {
  return (
    <CoachGuard>
      <DashboardPage />
    </CoachGuard>
  );
}
