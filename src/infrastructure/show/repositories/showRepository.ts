// src/infrastructure/repositories/showRepository.ts

import type { Show } from "@/domain/entities/show"
import type { IshowRepository } from "@/domain/repositories/iShowRepository"
import { mapApiShowToDomain } from "@/infrastructure/show/mappers/showMapper"

export class ShowRepository implements IshowRepository {
  private readonly baseUrl = 'https://api.tvmaze.com'

  async findByPage(page: number): Promise<Show[]> {
    if (!page || page < 1) {
      return []
    }

    try {
      const response = await fetch(`${this.baseUrl}/shows?page=${page}`)

      if (response.status === 404) {
        console.warn(`Reached last page at page ${page}`)
        return []
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const apiData = await response.json()
      // Mapping: API Response → Domain Entity
      return apiData.map(mapApiShowToDomain)
    } catch (error) {
      console.error('Error fetching shows:', error)
      throw error
    }
  }

  async search(query: string): Promise<Show[]> {
    if (!query || query.trim().length === 0) {
      return []
    }

    try {
      const response = await fetch(`${this.baseUrl}/search/shows?q=${encodeURIComponent(query)}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const apiData = await response.json()
      // Mapping: API Response → Domain Entity (search returns { show: {...} })
      return apiData.map((item: any) => mapApiShowToDomain(item.show))
    } catch (error) {
      console.error('Error searching shows:', error)
      throw error
    }
  }

  async findById(id: number): Promise<Show | null> {
    if (!id) {
      return null
    }

    try {
      const response = await fetch(`${this.baseUrl}/shows/${id}`)

      if (response.status === 404) {
        return null
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const apiData = await response.json()
      // Mapping: API Response → Domain Entity
      return mapApiShowToDomain(apiData)
    } catch (error) {
      console.error('Error fetching show:', error)
      throw error
    }
  }
}
