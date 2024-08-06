/**
 * Calculates the number of years of service since 2002 up to the current year.
 * @returns {number} The number of years of service.
 */
export function getYearsOfService() {
  // Get the current year
  const currentYear = new Date().getFullYear()

  // Calculate the number of years of service since 2002
  return currentYear - 2002
}
