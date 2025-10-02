"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";

interface WodCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  wodDates: Date[];
  className?: string;
}

export function WodCalendar({
  selected,
  onSelect,
  wodDates,
  className,
}: WodCalendarProps) {
  return (
    <div className={cn(className)}>
      <Calendar
        mode="single"
        selected={selected}
        onSelect={onSelect}
        locale={es}
        modifiers={{ hasWod: wodDates }}
        defaultMonth={selected}
        classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption_label: "text-lg font-medium",
            head_cell:
              "text-muted-foreground rounded-md w-9 font-normal text-sm",
            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_hasWod: "rdp-day_hasWod",
        }}
      />
    </div>
  );
}
