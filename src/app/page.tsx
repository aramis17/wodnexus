"use client";
import { useState, useEffect } from "react";
import { WodCalendar } from "@/components/wod-calendar";
import { WodDisplay } from "@/components/wod-display";
import { isSameDay, addDays, subDays } from "date-fns";
import {
  CalendarDays,
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  LogIn,
} from "lucide-react";
import { toZonedTime } from "date-fns-tz";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { Wod } from "@/lib/types";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import Link from "next/link";

const DayNavigator = ({
  selectedDate,
  onDateChange,
}: {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}) => {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    // Set today's date on the client-side to avoid hydration mismatch
    setToday(new Date());
  }, []);

  const handlePreviousDay = () => {
    onDateChange(subDays(selectedDate, 1));
  };

  const handleNextDay = () => {
    onDateChange(addDays(selectedDate, 1));
  };

  const handleGoToToday = () => {
    onDateChange(today);
  };

  const isToday = isSameDay(selectedDate, today);

  return (
    <div className="flex items-center justify-between p-2 bg-card rounded-lg shadow-sm w-full">
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePreviousDay}
        aria-label="Día anterior"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div className="text-center flex-1">
        <div className="font-bold text-lg text-primary flex items-center justify-center gap-2">
          <span>
            {isToday ? "Hoy" : format(selectedDate, "EEEE", { locale: es })}
          </span>
          {!isToday && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleGoToToday}
              className="h-7"
            >
              Hoy
            </Button>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {format(selectedDate, "d MMMM, yyyy", { locale: es })}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNextDay}
        aria-label="Día siguiente"
      >
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isClient, setIsClient] = useState(false);
  const isMobile = useIsMobile();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const firestore = useFirestore();
  const wodsCollectionRef = useMemoFirebase(
    () => (firestore ? collection(firestore, "wods") : null),
    [firestore]
  );
  const { data: wods, isLoading: wodsLoading } =
    useCollection<Wod>(wodsCollectionRef);

  useEffect(() => {
    setIsClient(true);
    setSelectedDate(new Date());
  }, []);

  const getWodForDate = (date: Date) => {
    if (!wods) return undefined;
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedDate = toZonedTime(date, userTimeZone);
    return wods.find((wod) => {
      const wodDate = toZonedTime(`${wod.date}T00:00:00`, userTimeZone);
      return isSameDay(zonedDate, wodDate);
    });
  };

  const selectedWod = selectedDate ? getWodForDate(selectedDate) : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setIsPopoverOpen(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <header className="p-4 border-b bg-card sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center justify-center gap-2 flex-1">
            <CalendarDays className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-headline font-bold text-center">
              WODNexus
            </h1>
          </div>
          <Button asChild variant="ghost" size="icon">
            <Link href="/login">
              <LogIn />
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        {isMobile ? (
          <div className="flex flex-col gap-4 items-center">
            <div className="w-full flex gap-2 items-center justify-center relative">
              <DayNavigator
                selectedDate={selectedDate || new Date()}
                onDateChange={setSelectedDate}
              />
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <CalendarIcon className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <WodCalendar
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    wods={wods || []}
                    isLoading={wodsLoading}
                    className="bg-card p-2 rounded-lg shadow-sm"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full">
              <WodDisplay wod={selectedWod} selectedDate={selectedDate} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-12">
            <div className="md:col-span-1 lg:col-span-1 mb-8 md:mb-0 md:sticky md:top-24 self-start">
              <WodCalendar
                selected={selectedDate}
                onSelect={setSelectedDate}
                wods={wods || []}
                isLoading={wodsLoading}
                className="bg-card p-2 rounded-lg shadow-sm"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <WodDisplay wod={selectedWod} selectedDate={selectedDate} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
