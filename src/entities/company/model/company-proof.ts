import type { TFunction } from 'i18next'

export type CompanyProofBlock = {
  description: string
  id: string
  isAccent?: boolean
  kicker: string
  title: string
}

export function getCompanyProofSection(t: TFunction) {
  return {
    description: t('proof.description'),
    sectionLabel: t('proof.sectionLabel'),
    title: t('proof.title'),
    titleSoft: t('proof.titleSoft'),
  }
}

export function getCompanyProofBlocks(t: TFunction): CompanyProofBlock[] {
  return [
    {
      description: t('proof.items.experience.description'),
      id: 'experience',
      isAccent: true,
      kicker: t('proof.items.experience.kicker'),
      title: t('proof.items.experience.title'),
    },
    {
      description: t('proof.items.workflow.description'),
      id: 'workflow',
      kicker: t('proof.items.workflow.kicker'),
      title: t('proof.items.workflow.title'),
    },
    {
      description: t('proof.items.architecturalIntegration.description'),
      id: 'architectural-integration',
      kicker: t('proof.items.architecturalIntegration.kicker'),
      title: t('proof.items.architecturalIntegration.title'),
    },
    {
      description: t('proof.items.postWarrantySupport.description'),
      id: 'post-warranty-support',
      kicker: t('proof.items.postWarrantySupport.kicker'),
      title: t('proof.items.postWarrantySupport.title'),
    },
  ]
}
