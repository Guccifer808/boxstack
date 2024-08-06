import { allBrandsData, brandsNames } from '@/data/allBrandsData'

/**
 * Loads brand data based on the provided parameter.
 *
 * @param {string} type - The type of data to load. Can be 'data' for all brand data or 'names' for brand names.
 * @returns {Promise<Array|Object|null>} - Returns the requested data or null if the parameter is invalid.
 */
export async function loadBrandData(type) {
  try {
    switch (type) {
      case 'data':
        return allBrandsData
      case 'names':
        return brandsNames
      default:
        console.warn(`Invalid parameter: ${type}. Expected 'data' or 'names'.`)
        return null
    }
  } catch (error) {
    console.error(`Error loading brand data: ${error.message}`)
    throw error
  }
}
