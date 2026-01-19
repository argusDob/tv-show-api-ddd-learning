import type { Favourite } from '@/domain/entities/favourite/favourite'
import type {Show} from '@/domain/entities/show/show'

export const calculateIsFavourite = (showId: number, favourites: Favourite[]): boolean => {
  return favourites.some(f => f.showId === showId)
}

export function toShowViewModel(show: Show, favourites: Favourite[]): ShowViewModel {
  return {
    id: show.id,
    name: show.name,
    image: show.image.medium,
    summary: show.summary,
    runtime: show.runtime,
    status: show.status,
    type: show.type,
    genres: show.genres,
    officialSite: show.officialSite,
    weight: show.weight.value,
    network: show.network?.name,
    country: show.network?.country?.name,
    sheduleDays: show.schedule?.days.join(', '),
    sheduleTime: show.schedule?.time,
    isFavourite: calculateIsFavourite(show.id, favourites),
  }
}

export type ShowViewModel = {
  id: number
  name: string
  image: string
  summary: string
  isFavourite: boolean,
  runtime?: number
  status: string
  type?: string
  genres: string[]
  officialSite?: string | null
  weight: number
  sheduleDays?: string
  sheduleTime?: string
  network?: string
  country?: string
}
