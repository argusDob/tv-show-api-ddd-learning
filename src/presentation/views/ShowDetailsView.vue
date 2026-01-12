<template>
  <RouterLink :to="`/`"> All Shows </RouterLink>
  <div v-if="!isLoading" class="show-details-view">

    <div class="show-details-view__image">
      <img :src="show.image" :alt="show.name" />
    </div>
   <div class="show-details-view__summary" v-html="show.summary"></div>
    <div class="show-details-view__card">
      <ShowInfoCard v-bind="show" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ShowInfoCard from '@/presentation/components/ShowIfoCard/ShowInfoCard.vue'

import { useShowStore } from '@/presentation/stores/movies/show'
const showStore = useShowStore()
const route = useRoute()

const isLoading = ref(true)

const show = computed(() => showStore.show)

onMounted(async () => {
  const id = route.params.id
  try {
    await showStore.loadShow(id)
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
<style scoped lang="scss">
.show-details-view {
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;

    &__image {
      img {
        width: 100%;
        height: auto;
      }
    }
    ::v-deep(.show-card) {
      width: 100%;
    }
  }
}
</style>
