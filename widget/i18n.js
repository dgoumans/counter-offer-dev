import en from './lang/en'

export function t(key) {
  const LOCALE_KEY = 'COUNTER_OFFER_LOCALE'

  const locale = window[LOCALE_KEY] || en

  const content = locale[key] || en[key]
  if (!locale[key]) {
    console.warn(
      '[counter_offer]',
      'translation of language key',
      `'${key}'`,
      'is missing.',
    )
  }
  return content
}
