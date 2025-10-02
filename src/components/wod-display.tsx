import { Wod, isMetconSection } from "@/lib/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WodContentParser } from "./wod-content-parser";
import { MetconTabs } from "./metcon-tabs";
import {
  Dumbbell,
  Flame,
  Zap,
  BrainCircuit,
  HeartPulse,
  Info,
  CalendarX,
} from "lucide-react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface WodDisplayProps {
  wod: Wod | undefined;
  selectedDate: Date | undefined;
}

const getSectionIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("warmup")) return Flame;
  if (lowerTitle.includes("weightlifting")) return Dumbbell;
  if (lowerTitle.includes("metcon")) return Zap;
  if (lowerTitle.includes("skill")) return BrainCircuit;
  if (lowerTitle.includes("conditioning")) return HeartPulse;
  return Info;
};

export function WodDisplay({ wod, selectedDate }: WodDisplayProps) {
  if (!wod || !selectedDate) {
    return (
      <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
        <CalendarX className="w-16 h-16 text-muted-foreground mb-4" />
        <CardTitle className="text-2xl mb-2">No WOD para este día</CardTitle>
        <CardDescription>
          {selectedDate
            ? `No hay un workout programado para el ${format(
                selectedDate,
                "d 'de' MMMM, yyyy",
                { locale: es }
              )}.`
            : "Por favor selecciona una fecha en el calendario."}
        </CardDescription>
      </Card>
    );
  }

  const defaultActiveSections = wod.sections.map((_, index) => `item-${index}`);

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardDescription>
          {format(selectedDate, "EEEE, d 'de' MMMM, yyyy", { locale: es })}
        </CardDescription>
        <CardTitle className="text-3xl font-bold">{wod.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {wod.intro.length > 0 && (
          <div className="p-4 bg-card/50 rounded-lg space-y-2 border">
            {wod.intro.map((line, index) => (
              <p key={index} className="text-sm text-foreground/80">
                {line}
              </p>
            ))}
          </div>
        )}

        <Accordion
          type="multiple"
          defaultValue={defaultActiveSections}
          className="w-full"
        >
          {wod.sections.map((section, index) => {
            const Icon = getSectionIcon(section.title);
            return (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-xl font-semibold">
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-primary" />
                    {section.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  {isMetconSection(section) ? (
                    <MetconTabs section={section} />
                  ) : (
                    <WodContentParser content={section.content} />
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
