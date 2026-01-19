export type Favourite = {
  readonly showId: number
  readonly addedAt: Date
}

export const createFavourite = (showId: number): Favourite => {
  return {
    showId,
    addedAt: new Date(),
  }
}


