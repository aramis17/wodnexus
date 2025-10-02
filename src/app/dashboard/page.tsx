"use client";

import { CoachGuard } from "@/components/auth/coach-guard";
import { useAuth } from "@/firebase";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const auth = useAuth();
  
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-4 border-b bg-card sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Coach Dashboard</h1>
          <Button variant="ghost" onClick={handleLogout}>Cerrar Sesión</Button>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-center">
            <h2 className="text-xl mb-4">Bienvenido, Coach!</h2>
            <p className="text-muted-foreground">Aquí podrás gestionar los WODs.</p>
            {/* Próximamente: Lista de WODs y formularios para CRUD */}
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
    return (
        <CoachGuard>
            <Dashboard />
        </CoachGuard>
    )
}
