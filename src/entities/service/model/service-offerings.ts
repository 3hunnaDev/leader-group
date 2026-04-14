import type { TFunction } from 'i18next'

export type ServiceOffering = {
  description: string
  id: string
  meta: string
  title: string
}

export function getServiceCatalogSection(t: TFunction) {
  return {
    description: t('services.description'),
    sectionLabel: t('services.sectionLabel'),
    title: t('services.title'),
    titleSoft: t('services.titleSoft'),
  }
}

export function getServiceOfferings(t: TFunction): ServiceOffering[] {
  return [
    {
      description: t('services.items.business.description'),
      id: 'business',
      meta: t('services.items.business.meta'),
      title: t('services.items.business.title'),
    },
    {
      description: t('services.items.residential.description'),
      id: 'residential',
      meta: t('services.items.residential.meta'),
      title: t('services.items.residential.title'),
    },
    {
      description: t('services.items.panoramic.description'),
      id: 'panoramic',
      meta: t('services.items.panoramic.meta'),
      title: t('services.items.panoramic.title'),
    },
    {
      description: t('services.items.escalators.description'),
      id: 'escalators',
      meta: t('services.items.escalators.meta'),
      title: t('services.items.escalators.title'),
    },
  ]
}
