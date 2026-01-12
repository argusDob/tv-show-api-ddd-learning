import { Favourite } from "@/domain/entities/favourite/favourite"

export const validateFavourite = (favouritesList: Favourite[], favourite: Favourite): void => {

 if(favouritesList.find(f => f.showId === favourite.showId)) {
    throw new Error("Show already in favourites")
 }

  if(favouritesList.length >= 50) {
    throw new Error("You can only add up to 50 favourites")
 }
}
