import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export default function CoachDashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
        <h1 className="text-2xl font-bold">Dashboard del Coach</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Gestionar WODs</CardTitle>
              <CardDescription>
                Crea, actualiza o elimina los Workouts of the Day.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Crear Nuevo WOD
                </Button>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" /> Modificar WOD Existente
                </Button>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar WOD
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}