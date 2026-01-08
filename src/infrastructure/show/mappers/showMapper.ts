import { Show } from "@/domain/entities/show"

export const mapApiShowToDomain = (apiData: any): Show => {
  return {
    id: apiData.id,
    name: apiData.name || '',
    genres: apiData.genres || [],
    weight: apiData.weight || 0,
    summary: apiData.summary || '',
    image: apiData.image || { medium: '' },
    status: apiData.status || '',
    premiered: apiData.premiered || '',
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
    averageRating: apiData.rating.average || 0,
  }
}
