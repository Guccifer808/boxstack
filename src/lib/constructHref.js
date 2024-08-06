/**
 * Constructs a fully qualified href with the specified language prefix.
 * @param {string} langPrefix The language prefix to prepend to the href.
 * @param {string} href The href without the language prefix.
 * @returns {string} The fully qualified href with the language prefix.
 */
export function constructHref(langPrefix, href) {
  return `/${langPrefix}${href}`
}
