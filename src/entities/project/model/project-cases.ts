export type ProjectCase = {
  description: string
  location: string
  title: string
  type: string
}

export const projectShowcaseSection = {
  description:
    'A curated selection of installations based on the current Leader Group project set, reframed as an editorial portfolio.',
  sectionLabel: 'Projects',
  title: 'Projects that move ',
  titleSoft: 'people and space.',
}

export const projectCases: ProjectCase[] = [
  {
    description:
      'Featured installation focused on smooth circulation, premium architectural fit, and confident day-to-day operation.',
    location: 'Moscow Region',
    title: 'Riverhouse',
    type: 'Commercial',
  },
  {
    description: 'Lift solution tailored to a multi-unit residential context.',
    location: 'Kazan',
    title: 'Astrum',
    type: 'Residential',
  },
  {
    description: 'Vertical mobility specified for a public educational building.',
    location: 'Tyumen',
    title: 'School, Bogorodsky',
    type: 'Education',
  },
  {
    description: 'Industrial installation balancing durability and serviceability.',
    location: 'Kostroma',
    title: 'Agrokhim',
    type: 'Industrial',
  },
]
