import type { TFunction } from 'i18next'

export type ProjectCase = {
  description: string
  id: string
  location: string
  title: string
  type: string
}

export function getProjectShowcaseSection(t: TFunction) {
  return {
    description: t('projects.description'),
    sectionLabel: t('projects.sectionLabel'),
    title: t('projects.title'),
    titleSoft: t('projects.titleSoft'),
  }
}

export function getProjectCases(t: TFunction): ProjectCase[] {
  return [
    {
      description: t('projects.items.riverhouse.description'),
      id: 'riverhouse',
      location: t('projects.items.riverhouse.location'),
      title: t('projects.items.riverhouse.title'),
      type: t('projects.items.riverhouse.type'),
    },
    {
      description: t('projects.items.astrum.description'),
      id: 'astrum',
      location: t('projects.items.astrum.location'),
      title: t('projects.items.astrum.title'),
      type: t('projects.items.astrum.type'),
    },
    {
      description: t('projects.items.schoolBogorodsky.description'),
      id: 'school-bogorodsky',
      location: t('projects.items.schoolBogorodsky.location'),
      title: t('projects.items.schoolBogorodsky.title'),
      type: t('projects.items.schoolBogorodsky.type'),
    },
    {
      description: t('projects.items.agrokhim.description'),
      id: 'agrokhim',
      location: t('projects.items.agrokhim.location'),
      title: t('projects.items.agrokhim.title'),
      type: t('projects.items.agrokhim.type'),
    },
  ]
}
