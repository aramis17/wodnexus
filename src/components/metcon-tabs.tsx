"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WodContentParser } from "./wod-content-parser";
import { MetconSection } from "@/lib/types";

interface MetconTabsProps {
  section: MetconSection;
}

export function MetconTabs({ section }: MetconTabsProps) {
  if (!section.levels || section.levels.length === 0) {
    return null;
  }

  return (
    <Tabs defaultValue={section.levels[0].name} className="w-full">
      <TabsList>
        {section.levels.map((level) => (
          <TabsTrigger key={level.name} value={level.name}>
            {level.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {section.levels.map((level) => (
        <TabsContent key={level.name} value={level.name}>
          <WodContentParser content={level.content} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
