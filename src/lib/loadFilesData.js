import { allFilesData } from '@/data/allFilesData'

/**
 * Loads files data based on the provided parameter.
 *
 * @param {string} type - The type of data to load.
 * @returns {Promise<Array|Object|null>} - Returns the requested data or null if the parameter is invalid.
 */
export async function loadFilesData(type) {
  try {
    switch (type) {
      case 'data':
        return allFilesData
      default:
        console.warn(`Invalid parameter: ${type}. Expected 'data'.`)
        return null
    }
  } catch (error) {
    console.error(`Error loading files data: ${error.message}`)
    throw error
  }
}
