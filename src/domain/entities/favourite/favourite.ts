import { Show } from "@/domain/entities/show/show"

export type Favourite = {
  readonly showId: number
  readonly addedAt: Date
  readonly show: Show  // Reference στο Show entity
}


const createFavourite = (show: Show): Favourite => {
  return {
    showId: show.id,
    addedAt: new Date(),
    show: show,
  }
}


