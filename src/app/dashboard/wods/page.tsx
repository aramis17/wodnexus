import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export default function WodsPage() {
  return (
    <div className="flex w-full flex-col">
      <header className="flex h-14 items-center gap-4 sm:h-auto sm:border-0 sm:bg-transparent mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Gestión de WODs
        </h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Administrar WODs</CardTitle>
              <CardDescription>
                Crea, actualiza o elimina los Workouts of the Day.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Button>
                  <PlusCircle /> Crear Nuevo WOD
                </Button>
                <Button variant="outline">
                  <Edit /> Modificar WOD Existente
                </Button>
                <Button variant="destructive">
                  <Trash2 /> Eliminar WOD
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
