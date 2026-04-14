export type ServiceOffering = {
  description: string
  meta: string
  title: string
}

export const serviceCatalogSection = {
  description:
    'Leader Group adapts vertical transport to architecture, traffic, and operating logic, from compact residential lifts to high-throughput commercial systems.',
  sectionLabel: 'Solutions',
  title: 'Systems for business, residential,',
  titleSoft: ' and public flow.',
}

export const serviceOfferings: ServiceOffering[] = [
  {
    description:
      'High-capacity systems for offices, mixed-use properties, and projects where throughput and reliability define daily comfort.',
    meta: 'Business flow',
    title: 'Business lifts',
  },
  {
    description:
      'Quiet, durable passenger solutions shaped around residential architecture, accessibility, and long-term maintenance.',
    meta: 'Residential comfort',
    title: 'Residential lifts',
  },
  {
    description:
      'Expressive glass-forward systems that turn vertical movement into part of the spatial experience without losing engineering discipline.',
    meta: 'Architectural statement',
    title: 'Panoramic lifts',
  },
  {
    description:
      'Solutions for retail, transit, and public flow where stable operation, service access, and traffic logic matter most.',
    meta: 'Public circulation',
    title: 'Escalators & travelators',
  },
]
