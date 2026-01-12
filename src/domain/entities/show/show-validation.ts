import { CreateShowData } from "@/domain/entities/show/show"

export const validateShow = (data: CreateShowData): void => {
  if (!data) {
    throw new Error('Data is required')
  }

  if (!data.id) {
    throw new Error('Id is required')
  }

  if (!data.name) {
    throw new Error('Name is required')
  }

  if (!data.genres) {
    throw new Error('Genres is required')
  }

  if (!data.weight) {
    throw new Error('Weight is required')
  }

  if (!data.summary) {
    throw new Error('Summary is required')
  }

  if (!data.image?.medium) {
    throw new Error('Image with medium property is required')
  }

  if (!data.status) {
    throw new Error('Status is required')
  }
}
