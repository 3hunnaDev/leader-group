export type ProjectCase = {
  location: string
  title: string
  type: string
}

export const projectShowcaseSection = {
  sectionLabel: 'Наши проекты',
  title: 'Лифт — символ прогресса,',
  titleSoft: ' который поднимает вверх.',
}

export const projectCases: ProjectCase[] = [
  {
    location: 'Московская область',
    title: 'Riverhouse',
    type: 'Коммерческий объект',
  },
  {
    location: 'Казань',
    title: 'Аструм',
    type: 'Жилой комплекс',
  },
  {
    location: 'Тюмень',
    title: 'Школа, микрорайон Богородский',
    type: 'Образовательный объект',
  },
  {
    location: 'Кострома',
    title: 'Агрохим',
    type: 'Промышленный объект',
  },
]
