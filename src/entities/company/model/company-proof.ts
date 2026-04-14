export type CompanyProofBlock = {
  description: string
  isAccent?: boolean
  kicker: string
  title: string
}

export const companyProofSection = {
  description:
    'The value sits in coordination, certification, and how well every system fits the building it serves, not in inflated metrics.',
  sectionLabel: 'Why Us',
  title: 'We don’t just supply equipment ',
  titleSoft: 'we design reliable movement.',
}

export const companyProofBlocks: CompanyProofBlock[] = [
  {
    description:
      'Long-term involvement in lift projects informs specification, planning, and risk control from first briefing to final launch.',
    isAccent: true,
    kicker: 'Experience',
    title: '20+ years of industry experience',
  },
  {
    description:
      'Installation and testing follow a structured process designed for safe commissioning and predictable handover.',
    kicker: 'Delivery',
    title: 'Certified installation workflow',
  },
  {
    description:
      'Cabin aesthetics, shaft logic, and traffic planning are aligned with the wider building concept rather than treated separately.',
    kicker: 'Integration',
    title: 'Architectural integration',
  },
  {
    description:
      'The relationship continues after launch with service guidance, spare parts planning, and operational support.',
    kicker: 'Support',
    title: 'Post-warranty support',
  },
]
