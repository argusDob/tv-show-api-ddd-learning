// src/stores/show.js
import { defineStore } from 'pinia'
import { toShowViewModel } from '@/presentation/models/ShowViewModel'

export const useShowStore = defineStore('show', {
  state: () => ({
    shows: [],
    show: {},
    popularShows: [],
    crimeShows: [],
    genresList: [],
  }),

  actions: {
    async loadShows(page) {
      const shows = await this.useCases.getShows(page)
      const favourites = await this.useCases.findAllFavourites
      this.shows = shows.map(show => toShowViewModel(show, favourites))
    },
    resetShows() {
      this.shows = []
    },
    async searchedShows(term) {
      this.shows = await this.useCases.searchShows(term)
    },
    async loadShow(id) {
     const show = await this.useCases.getShowById(id)
     this.show = toShowViewModel(show, [])
    },
    setFilteredShows(filterCriteria) {
      const genre = filterCriteria.genre?.value || null
      const rating = filterCriteria.rating?.value || filterCriteria.rating || null

      if (genre === null && rating === null) {
        this.loadShows(1)
        return
      }

      this.shows = this.useCases.filterShows(this.shows, {
        genre,
        rating,
      })
    },
    addFavourites(show) {
      this.useCases.addFavourites(show)
    },

    setGenreList(genresList) {
      this.genresList = genresList
    },
    setPopularShows() {
      this.popularShows = this.useCases.filterPopular(this.shows)
    },
    filterCrimeShows() {
      this.crimeShows = this.useCases.filterCrime(this.shows)
    },
    setShow(show) {
      this.show = show
    },
  },
})
