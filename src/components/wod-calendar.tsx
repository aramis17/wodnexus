"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import type { Wod } from "@/lib/types";
import { toZonedTime } from "date-fns-tz";
import { useMemo } from "react";
import { Skeleton } from "./ui/skeleton";

interface WodCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  wods: Wod[];
  className?: string;
  isLoading: boolean;
}

export function WodCalendar({
  selected,
  onSelect,
  wods,
  className,
  isLoading,
}: WodCalendarProps) {
  const wodDates = useMemo(() => {
    if (!wods) return [];
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return wods.map((wod) => toZonedTime(`${wod.date}T00:00:00`, userTimeZone));
  }, [wods]);

  if (isLoading) {
    return (
      <div className={cn("p-4", className)}>
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-7 gap-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-9 w-9" />
            ))}
          </div>
          {[...Array(5)].map((_, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-2">
              {[...Array(7)].map((_, dayIndex) => (
                <Skeleton key={dayIndex} className="h-9 w-9 rounded-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      <Calendar
        mode="single"
        selected={selected}
        onSelect={onSelect}
        locale={es}
        modifiers={{ hasWod: wodDates }}
        defaultMonth={selected || new Date()}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption_label: "text-lg font-medium",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-sm",
          cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_hasWod: "rdp-day_hasWod",
        }}
      />
    </div>
  );
}
