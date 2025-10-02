
"use client";
import { useState } from "react";
import { WodCalendar } from "@/components/wod-calendar";
import { WodDisplay } from "@/components/wod-display";
import { wods } from "@/lib/wods-data";
import { isSameDay, addDays, subDays } from "date-fns";
import { CalendarDays, ArrowLeft, ArrowRight, Calendar as CalendarIcon, Undo2 } from "lucide-react";
import { toZonedTime } from 'date-fns-tz';
import { useIsMobile } from "@/hooks/use-mobile";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


const getWodForDate = (date: Date) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return wods.find((wod) => {
    const wodDate = toZonedTime(`${wod.date}T00:00:00`, userTimeZone);
    return isSameDay(date, wodDate);
  });
}

const DayNavigator = ({ selectedDate, onDateChange }: { selectedDate: Date, onDateChange: (date: Date) => void }) => {
  const today = new Date();

  const handlePreviousDay = () => {
    onDateChange(subDays(selectedDate, 1));
  };

  const handleNextDay = () => {
    onDateChange(addDays(selectedDate, 1));
  };
  
  const handleGoToToday = () => {
    onDateChange(today);
  }

  const isToday = isSameDay(selectedDate, today);

  return (
    <div className="flex items-center justify-between p-2 bg-card rounded-lg shadow-sm w-full">
      <Button variant="ghost" size="icon" onClick={handlePreviousDay} aria-label="Día anterior">
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div className="text-center">
        <div className="font-bold text-lg text-primary">
          {isToday ? "Hoy" : format(selectedDate, 'EEEE', { locale: es })}
        </div>
        <div className="text-sm text-muted-foreground">
          {format(selectedDate, 'd MMMM, yyyy', { locale: es })}
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={handleNextDay} aria-label="Día siguiente">
        <ArrowRight className="h-5 w-5" />
      </Button>
       {!isToday && (
         <Button variant="ghost" size="icon" onClick={handleGoToToday} aria-label="Ir a hoy" className="absolute right-16">
          <Undo2 className="h-5 w-5" />
        </Button>
       )}
    </div>
  );
}


export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const isMobile = useIsMobile();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const selectedWod = selectedDate ? getWodForDate(selectedDate) : undefined;
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if(date) {
      setIsPopoverOpen(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <header className="p-4 border-b bg-card sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <CalendarDays className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-headline font-bold text-center">
            WOD Calendar
          </h1>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        {isMobile ? (
           <div className="flex flex-col gap-4 items-center">
             <div className="w-full flex gap-2 items-center justify-center relative">
                <DayNavigator selectedDate={selectedDate || new Date()} onDateChange={setSelectedDate} />
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
                      wods={wods}
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
                wods={wods}
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

    