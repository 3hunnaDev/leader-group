export type CompanyApproachPrinciple = {
  description: string
  meta: string
  title: string
}

export const companyApproachSection = {
  description:
    'Instead of testimonials, the page explains the principles clients actually work with throughout specification, delivery, and service.',
  sectionLabel: 'Approach',
  title: 'A partnership model shaped by ',
  titleSoft: 'clarity and long-term care.',
}

export const companyApproachPrinciples: CompanyApproachPrinciple[] = [
  {
    description:
      'We rely on accumulated industry knowledge to reduce uncertainty and move projects forward with technical confidence.',
    meta: '01 / Trust foundation',
    title: 'Experience and reliability',
  },
  {
    description:
      'Materials, equipment, and testing are selected around safety, durability, and consistency across the delivery chain.',
    meta: '02 / Standards',
    title: 'High quality standards',
  },
  {
    description:
      'Each building asks for a different response, so transport logic and product selection are adapted to the actual brief.',
    meta: '03 / Tailoring',
    title: 'Tailored project approach',
  },
  {
    description:
      'We stay involved after installation with service coordination and operational support instead of disappearing at handover.',
    meta: '04 / Continuity',
    title: 'Long-term partnership',
  },
]
