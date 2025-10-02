export type MetconLevel = {
  name: string;
  content: string;
};

export type BaseSection = {
  title: string;
  content: string;
};

export type MetconSection = {
  title:string;
  type: 'metcon';
  levels: MetconLevel[];
};

export type WodSection = BaseSection | MetconSection;

export function isMetconSection(section: WodSection): section is MetconSection {
  return (section as MetconSection).type === 'metcon';
}

export type Wod = {
  date: string; // 'YYYY-MM-DD'
  title: string;
  intro: string[];
  sections: WodSection[];
};
