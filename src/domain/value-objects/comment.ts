export type Comment = {
  value: string,
}

export const createComment = (value: string): Comment => {

  if (value.length < 10) {
    throw new Error('Comment must be at least 10 characters long')
  }

  if (value.length > 500) {
    throw new Error('Comment must be less than 500 characters long')
  }

  if (!value.trim()) {
    throw new Error('Comment must not be empty')
  }

  return {
    value,
  }
}
