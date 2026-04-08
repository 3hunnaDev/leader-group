export type ServiceOffering = {
  description: string
  title: string
}

export const serviceCatalogSection = {
  catalogLinkText: 'Смотреть весь каталог',
  catalogMeta: 'Каталог',
  catalogTitle: 'Лифт — это маленькая вселенная, где время останавливается, а люди встречаются.',
  sectionLabel: 'Ассортимент и услуги',
  title: 'Подъёмное оборудование',
}

export const serviceOfferings: ServiceOffering[] = [
  {
    description:
      'Комплексные решения для офисных и многофункциональных объектов с высокой нагрузкой.',
    title: 'Лифты для бизнес центров',
  },
  {
    description: 'Современные пассажирские решения для жилых комплексов и частных домов.',
    title: 'Лифты для жилых домов',
  },
  {
    description: 'Панорамные системы с акцентом на дизайн, обзор и бесшумную работу.',
    title: 'Панорамные лифты',
  },
  {
    description: 'Проектирование, поставка и обслуживание эскалаторов и траволаторов.',
    title: 'Эскалаторы и траволаторы',
  },
]
