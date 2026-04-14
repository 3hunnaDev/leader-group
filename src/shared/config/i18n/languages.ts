export const appLanguages = ['ru', 'en'] as const

export type AppLanguage = (typeof appLanguages)[number]

export const defaultLanguage: AppLanguage = 'en'

export const languageLabels: Record<AppLanguage, string> = {
  en: 'EN',
  ru: 'RU',
}

export function resolveAppLanguage(language?: string | null): AppLanguage {
  if (language?.toLowerCase().startsWith('ru')) {
    return 'ru'
  }

  return 'en'
}
