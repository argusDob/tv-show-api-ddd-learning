export type Show = {
  // Identity
  readonly id: number

  // Core business properties
  readonly name: string
  readonly genres: string[]
  readonly weight: number

  // Display properties
  readonly summary: string
  readonly image: { medium: string }
  readonly status: string
  readonly premiered: string

  // Optional properties (μόνο αν χρειάζονται για business logic)
  readonly network?: {
    name: string
    country: { name: string }
  }
  readonly schedule?: {
    days: string[]
    time?: string
  }
  readonly runtime?: number
  readonly type?: string
  readonly officialSite?: string | null
}

/**
 * Pure function: Get rating from show weight
 * Business Rule: Weight 0-100 → Rating 1-5
 */
export const getRating = (show: Show): number => {
  if (show.weight <= 20) return 1
  if (show.weight <= 40) return 2
  if (show.weight <= 60) return 3
  if (show.weight <= 80) return 4
  return 5
}

/**
 * Pure function: Check if show is crime
 * Business Rule: Show is Crime if genres includes "Crime"
 */
export const isCrimeShow = (show: Show): boolean => {
  return show.genres.includes('Crime')
}

/**
 * Pure function: Check if show is popular
 * Business Rule: Show is Popular if rating is 5 (weight > 80)
 */
export const isPopular = (show: Show): boolean => {
  return getRating(show) === 5
}

/**
 * Pure function: Check if show has specific genre
 */
export const hasGenre = (show: Show, genre: string): boolean => {
  return show.genres.includes(genre)
}

/**
 * Pure function: Check if show matches rating
 */
export const matchesRating = (show: Show, rating: number): boolean => {
  return getRating(show) === rating
}

/**
 * Factory function: Create Show from API data
 *
 * Mapping Layer: Μετατρέπει API response → Domain Entity
 * Αποφασίζει τι να κρατήσει (Domain) και τι να αγνοήσει (Infrastructure)
 */
export const createShow = (apiData: any): Show => {
  return {
    // Core properties
    id: apiData.id,
    name: apiData.name || '',
    genres: apiData.genres || [],
    weight: apiData.weight || 0,

    // Display properties
    summary: apiData.summary || '',
    image: apiData.image || { medium: '' },
    status: apiData.status || '',
    premiered: apiData.premiered || '',

    // Optional properties (μόνο αν υπάρχουν)
    network: apiData.network ? {
      name: apiData.network.name || '',
      country: {
        name: apiData.network.country?.name || ''
      }
    } : undefined,

    schedule: apiData.schedule ? {
      days: apiData.schedule.days || [],
      time: apiData.schedule.time
    } : undefined,

    runtime: apiData.runtime,
    type: apiData.type,
    officialSite: apiData.officialSite,

    // ΔΕΝ κρατάμε Infrastructure concerns:
    // - url (Infrastructure)
    // - _links (Infrastructure)
    // - updated (Infrastructure)
    // - externals (Infrastructure)
    // - webChannel (αν δεν το χρειάζεσαι)
    // - dvdCountry (αν δεν το χρειάζεσαι)
    // - averageRuntime (αν έχουμε runtime)
    // - rating.average (αν δεν το χρησιμοποιούμε)
  }
}
