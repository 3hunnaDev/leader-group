import type { TFunction } from 'i18next'

export type CompanySocialLink = {
  href: string
  label: string
}

function createWhatsAppProposalHref(message: string) {
  return `https://wa.me/79801591029?text=${encodeURIComponent(message)}`
}

export function getCompanyContactSection(t: TFunction) {
  return {
    bottomText: t('contact.bottomText'),
    bottomTitle: t('contact.bottomTitle'),
    columnContactsTitle: t('contact.columnContactsTitle'),
    columnMenuTitle: t('contact.columnMenuTitle'),
    ctaHref: createWhatsAppProposalHref(t('contact.ctaMessage')),
    ctaLabel: t('common.ctaRequestProposal'),
    description: t('contact.description'),
    eyebrow: t('contact.eyebrow'),
    narrative: t('contact.narrative'),
    narrativeTitle: t('contact.narrativeTitle'),
    title: t('contact.title'),
  }
}

export const companyPhoneNumbers = [
  '+7 (925) 383-80-13',
  '+7 (926) 959-65-75',
  '+7 (925) 456-91-99',
]

export function getCompanySocialLinks(t: TFunction): CompanySocialLink[] {
  return [
    {
      href: 'https://wa.me/79801591029',
      label: t('contact.social.whatsapp'),
    },
    {
      href: 'https://t.me/lidergroupp',
      label: t('contact.social.telegram'),
    },
  ]
}
