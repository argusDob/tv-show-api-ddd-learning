<template>
  <div class="movie-list-view">
    <FiltersGroup v-model="filterCriteria" :genreList="genreList" :isLoading="isLoading" @on-search="handleSearchAction"
      @on-clear-search="handleClearSearch" />
    <div class="movie-list-view__sliders">
      <div class="movie-slider movie-slider--all">
        <span class="movie-slider__title">All Shows:</span>
        <Transition name="fade">
          <div v-show="allShows?.length ?? 0">
            <ShowsSlider v-if="!isLoading" :key="allShows?.length ?? 0" :showsList="allShowsSwiperList"
              @on-swiper-change="handleAllShowsChange" @add-favourite="handleAddFavourite" />
            <ProgressSpinner v-else />
          </div>
        </Transition>
        <ProgressSpinner v-if="isLoading" />
        <p v-if="allShows?.length === 0 && !isLoading">No results found</p>
      </div>
      <div class="movie-slider movie-slider--crime">
        <span class="movie-slider__title">Crime Shows:</span>
        <ShowsSlider v-if="!isLoading" :showsList="crimeShowsSwiperList" @on-swiper-change="handleCrimeShowsChange" />
        <ProgressSpinner v-else />
      </div>
      <div class="movie-slider movie-slider--popular">
        <span class="movie-slider__title">Popular Shows:</span>
        <ShowsSlider v-if="!isLoading" :showsList="popularShowsSwiperList"
          @on-swiper-change="handlePopularShowsChange" />
        <ProgressSpinner v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onErrorCaptured, onMounted, watch, defineAsyncComponent, computed } from 'vue'
import { useShowStore } from '@/presentation/stores/movies/show'

import FiltersGroup from '@/presentation/components/FiltersGroup/FiltersGroup.vue'
const ShowsSlider = defineAsyncComponent(() => import('@/presentation/components/ShowsSlider/ShowsSlider.vue'))
const showStore = useShowStore()

// import ShowsService from '@/services/ShowsService'
// import FiltersService from '@/services/FiltersService'
import { useSwiperPagination } from '@/presentation/composables/App/useSwiperPaginations'
const FIRST_PAGE = 1

const filterCriteria = ref({
  term: '',
  rating: null,
  genre: null,
})


const currentPage = ref(FIRST_PAGE)
const isLoading = ref(false)

// const showService = new ShowsService()
// const filtersService = new FiltersService()

watch(filterCriteria, (updatedFilterCriteria) => {
  if (
    Object.prototype.hasOwnProperty.call(updatedFilterCriteria, 'rating') ||
    Object.prototype.hasOwnProperty.call(updatedFilterCriteria, 'genre')
  ) {
    showStore.setFilteredShows({
      genre: updatedFilterCriteria.genre,
      rating: updatedFilterCriteria.rating
    })
  }
})

const allShows = computed(() => showStore.shows)
const crimeShows = computed(() => showStore.crimeShows)
const popularShows = computed(() => showStore.popularShows)
// const genreList = computed(() => showService.getGenreList())

const handleSearchAction = async () => {
  await showStore.searchedShows(filterCriteria.value?.term)
}

const handleAddFavourite = (show) => {
  showStore.addFavourites(show)
}

const handleClearSearch = async () => {
  // const FIRST_PAGE = 1
  if (!filterCriteria.value.term.length) return
  // await showService.getShowsRequest(FIRST_PAGE, 'clear')
  resetInputSearch()
}

const resetInputSearch = () => {
  filterCriteria.value = {
    term: '',
  }
}

onMounted(async () => {
  await showStore.loadShows(1)
  showStore.filterCrimeShows()
  showStore.setPopularShows()
})

// // All shows Pagination
const { swiperList: allShowsSwiperList, handleSwiperChange: handleAllShowsChange } =
  useSwiperPagination(allShows, currentPage, filterCriteria)

//Crime Shows Pagination
const { swiperList: crimeShowsSwiperList, handleSwiperChange: handleCrimeShowsChange } =
  useSwiperPagination(crimeShows, null, { term: '' })

//Popular Shows Pagination
const { swiperList: popularShowsSwiperList, handleSwiperChange: handlePopularShowsChange } =
  useSwiperPagination(popularShows, null, { term: '' })

onErrorCaptured((error) => {
  console.error(error)
  return false
})
</script>

<style scoped lang="scss">
.movie-list-view {
  &__sliders {
    margin-top: 16px;
  }

  .movie-slider {
    margin-bottom: 2rem;

    &__title {
      font-weight: bold;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      display: block;
      color: #333;
    }

    &--all,
    &--crime,
    &--popular {
      min-height: 550px;
      position: relative;
    }
  }
}
</style>
