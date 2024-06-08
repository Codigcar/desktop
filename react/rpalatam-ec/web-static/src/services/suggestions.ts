import { useState, useEffect } from 'react'
import { getBrand } from '../tools/tools'

function getTrendsUrl(): string {
  const BASE_URL = process.env.REACT_APP_SUGGESTIONS_URL
  const trendsUrls = {
    elcomercio: `${BASE_URL}/elcomercio/trends`,
    gestion: `${BASE_URL}/gestion/trends`,
  }

  return trendsUrls[getBrand()]
}

export type SuggestionAuthor = {
  name: string
  slug: string
  image?: string
}

export type SuggestionTag = {
  text: string
  slug: string
}

type SuggestionsResponse = {
  authors: SuggestionAuthor[]
  tags: SuggestionTag[]
}

export async function getSuggestions() {
  const response = await fetch(getTrendsUrl())
  if (!response.ok) throw new Error('Error at get Suggestions service')
  return (await response.json()) as SuggestionsResponse
}

export const useSuggestions = () => {
  const [error, setError] = useState<string | null>(null)
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<SuggestionsResponse>({
    authors: [],
    tags: [],
  })

  useEffect(() => {
    setIsLoadingSuggestions(true)
    getSuggestions()
      .then(setSuggestions)
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setIsLoadingSuggestions(false)
      })
  }, [])

  return {
    suggestions,
    isLoadingSuggestions,
    error,
  }
}
