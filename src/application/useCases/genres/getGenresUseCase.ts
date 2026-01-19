import { Show } from "@/domain/entities/show/show"
import { getGenres } from "@/application/utils/genres"

export const getGenresUseCase = (shows: Show[]): string[] => {
  return getGenres(shows)
}
