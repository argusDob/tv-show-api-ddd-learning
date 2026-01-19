import { Show } from "@/domain/entities/show/show"
export function getGenres(shows: Show[]): string[] {
  const genres = new Set<string>()

  shows.forEach(show => {
    show.genres.forEach(genre => {
      if (genres.has(genre)) {
        return
      }
      genres.add(genre)
    })
  })

  return Array.from(genres)
}
