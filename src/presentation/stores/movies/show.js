// src/stores/show.js
import { defineStore } from 'pinia'

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
      this.shows = await this.useCases.getShows(page)
    },
    resetShows() {
      this.shows = []
    },
    async searchedShows(term) {
      this.shows = await this.useCases.searchShows(term)
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
