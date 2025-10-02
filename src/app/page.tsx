"use client";
import { useState } from "react";
import { WodCalendar } from "@/components/wod-calendar";
import { WodDisplay } from "@/components/wod-display";
import { wods } from "@/lib/wods-data";
import { isSameDay } from "date-fns";
import { CalendarDays } from "lucide-react";

// Helper para obtener una fecha en UTC y evitar problemas de zona horaria
const getUTCDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
};

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Obtenemos las fechas de los WODs como fechas UTC
  const wodDates = wods.map((wod) => getUTCDate(wod.date));

  const selectedWod = selectedDate
    ? wods.find((wod) => {
        const wodDate = getUTCDate(wod.date);
        return isSameDay(wodDate, selectedDate);
      })
    : undefined;

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <header className="p-4 border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <CalendarDays className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-headline font-bold text-center">
            WOD Calendar
          </h1>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-12">
          <div className="md:col-span-1 lg:col-span-1 mb-8 md:mb-0 md:sticky md:top-24 self-start">
            <WodCalendar
              selected={selectedDate}
              onSelect={setSelectedDate}
              wodDates={wodDates}
              className="bg-card p-2 rounded-lg shadow-sm"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
           <WodDisplay wod={selectedWod} selectedDate={selectedDate} />
          </div>
        </div>
      </main>
    </div>
  );
}
