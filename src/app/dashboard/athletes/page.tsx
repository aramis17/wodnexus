import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AthletesPage() {
  return (
    <div className="flex w-full flex-col">
      <header className="flex h-14 items-center gap-4 sm:h-auto sm:border-0 sm:bg-transparent mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Gestión de Atletas
        </h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Próximamente</CardTitle>
            <CardDescription>
              Esta sección te permitirá gestionar a tus atletas. ¡Estamos trabajando en ello!
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
}
