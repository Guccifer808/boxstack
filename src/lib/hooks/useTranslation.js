import { dictionary } from '@/dictionary'

/**
 * Translates a key to its corresponding value in the specified language.
 * @param {string} key The key to translate.
 * @returns {string} The translated value, or the key itself if translation is not available.
 */
export function useTranslation(lang) {
  return (key) => {
    // Check if the key is undefined or null
    if (!key) {
      return key
    }

    // Check if the key contains a dot
    if (key.includes('.')) {
      // Split the key into nested levels
      const keys = key.split('.')
      // Initialize the translation with the language dictionary
      let translation = dictionary[lang]
      // Iterate through the nested keys to find the translation
      for (const k of keys) {
        translation = translation?.[k]
      }
      // Return the translation if available, otherwise return the key itself
      return translation || key
    } else {
      // If the key does not contain a dot, directly access the translation
      const translation = dictionary[lang]?.[key]
      return translation || key
    }
  }
}
