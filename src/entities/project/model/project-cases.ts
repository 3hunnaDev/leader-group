import type { TFunction } from 'i18next'

export type ProjectCaseDetail = {
  description: string
  label: string
}

export type ProjectCase = {
  featuredContext: string
  featuredDetails: ProjectCaseDetail[]
  description: string
  featuredNarrative: string
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
      featuredContext: t('projects.items.riverhouse.featuredContext'),
      featuredDetails: [
        {
          description: t('projects.items.riverhouse.featuredDetails.focus.description'),
          label: t('projects.items.riverhouse.featuredDetails.focus.label'),
        },
        {
          description: t('projects.items.riverhouse.featuredDetails.architecture.description'),
          label: t('projects.items.riverhouse.featuredDetails.architecture.label'),
        },
        {
          description: t('projects.items.riverhouse.featuredDetails.operations.description'),
          label: t('projects.items.riverhouse.featuredDetails.operations.label'),
        },
      ],
      description: t('projects.items.riverhouse.description'),
      featuredNarrative: t('projects.items.riverhouse.featuredNarrative'),
      id: 'riverhouse',
      location: t('projects.items.riverhouse.location'),
      title: t('projects.items.riverhouse.title'),
      type: t('projects.items.riverhouse.type'),
    },
    {
      featuredContext: t('projects.items.astrum.featuredContext'),
      featuredDetails: [
        {
          description: t('projects.items.astrum.featuredDetails.focus.description'),
          label: t('projects.items.astrum.featuredDetails.focus.label'),
        },
        {
          description: t('projects.items.astrum.featuredDetails.comfort.description'),
          label: t('projects.items.astrum.featuredDetails.comfort.label'),
        },
        {
          description: t('projects.items.astrum.featuredDetails.maintenance.description'),
          label: t('projects.items.astrum.featuredDetails.maintenance.label'),
        },
      ],
      description: t('projects.items.astrum.description'),
      featuredNarrative: t('projects.items.astrum.featuredNarrative'),
      id: 'astrum',
      location: t('projects.items.astrum.location'),
      title: t('projects.items.astrum.title'),
      type: t('projects.items.astrum.type'),
    },
    {
      featuredContext: t('projects.items.schoolBogorodsky.featuredContext'),
      featuredDetails: [
        {
          description: t('projects.items.schoolBogorodsky.featuredDetails.flow.description'),
          label: t('projects.items.schoolBogorodsky.featuredDetails.flow.label'),
        },
        {
          description: t('projects.items.schoolBogorodsky.featuredDetails.safety.description'),
          label: t('projects.items.schoolBogorodsky.featuredDetails.safety.label'),
        },
        {
          description: t('projects.items.schoolBogorodsky.featuredDetails.clarity.description'),
          label: t('projects.items.schoolBogorodsky.featuredDetails.clarity.label'),
        },
      ],
      description: t('projects.items.schoolBogorodsky.description'),
      featuredNarrative: t('projects.items.schoolBogorodsky.featuredNarrative'),
      id: 'school-bogorodsky',
      location: t('projects.items.schoolBogorodsky.location'),
      title: t('projects.items.schoolBogorodsky.title'),
      type: t('projects.items.schoolBogorodsky.type'),
    },
    {
      featuredContext: t('projects.items.agrokhim.featuredContext'),
      featuredDetails: [
        {
          description: t('projects.items.agrokhim.featuredDetails.durability.description'),
          label: t('projects.items.agrokhim.featuredDetails.durability.label'),
        },
        {
          description: t('projects.items.agrokhim.featuredDetails.service.description'),
          label: t('projects.items.agrokhim.featuredDetails.service.label'),
        },
        {
          description: t('projects.items.agrokhim.featuredDetails.routine.description'),
          label: t('projects.items.agrokhim.featuredDetails.routine.label'),
        },
      ],
      description: t('projects.items.agrokhim.description'),
      featuredNarrative: t('projects.items.agrokhim.featuredNarrative'),
      id: 'agrokhim',
      location: t('projects.items.agrokhim.location'),
      title: t('projects.items.agrokhim.title'),
      type: t('projects.items.agrokhim.type'),
    },
  ]
}
