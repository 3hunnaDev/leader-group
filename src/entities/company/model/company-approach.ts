import type { TFunction } from 'i18next'

export type CompanyApproachPrinciple = {
  description: string
  id: string
  meta: string
  title: string
}

export function getCompanyApproachSection(t: TFunction) {
  return {
    description: t('approach.description'),
    sectionLabel: t('approach.sectionLabel'),
    title: t('approach.title'),
    titleSoft: t('approach.titleSoft'),
  }
}

export function getCompanyApproachPrinciples(t: TFunction): CompanyApproachPrinciple[] {
  return [
    {
      description: t('approach.items.experience.description'),
      id: 'experience',
      meta: t('approach.items.experience.meta'),
      title: t('approach.items.experience.title'),
    },
    {
      description: t('approach.items.standards.description'),
      id: 'standards',
      meta: t('approach.items.standards.meta'),
      title: t('approach.items.standards.title'),
    },
    {
      description: t('approach.items.tailoring.description'),
      id: 'tailoring',
      meta: t('approach.items.tailoring.meta'),
      title: t('approach.items.tailoring.title'),
    },
    {
      description: t('approach.items.continuity.description'),
      id: 'continuity',
      meta: t('approach.items.continuity.meta'),
      title: t('approach.items.continuity.title'),
    },
  ]
}
