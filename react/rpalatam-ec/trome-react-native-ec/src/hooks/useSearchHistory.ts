import { useCallback, useEffect } from 'react'

import { useSearchContext } from '../context/search'
import { STORE_SEARCH_HISTORY } from '../utils/constants'
import { storage } from '../utils/storage'

type UseSearchHistory = {
  removeTermFromHistory(term: string): void
  saveTermFromHistory(term: string): void
}

export const formatedTerm = (term: string): string => {
  const lowerCaseTerm = term.toLocaleLowerCase().trim()
  return lowerCaseTerm.replace(/\s{2,}/g, ' ')
}

const useSearchHistory = (): UseSearchHistory => {
  const { termListHistory, setTermListHistory } = useSearchContext()

  useEffect(() => {
    const history = storage.getString(STORE_SEARCH_HISTORY)
    if (!history) return

    setTermListHistory(JSON.parse(history))
  }, [setTermListHistory])

  const saveTermFromHistory = useCallback(
    (term: string) => {
      const termFormate = formatedTerm(term)
      const removeTerm = termListHistory.filter((t) => t !== termFormate)
      const nextHistory = [termFormate, ...removeTerm]
      const newHistoryList = nextHistory.slice(0, 50)

      storage.set(STORE_SEARCH_HISTORY, JSON.stringify(newHistoryList))
      setTermListHistory(newHistoryList)
    },
    [setTermListHistory, termListHistory],
  )

  const removeTermFromHistory = useCallback(
    (term: string) => {
      const nextHistory = termListHistory.filter((t) => t !== term)

      storage.set(STORE_SEARCH_HISTORY, JSON.stringify(nextHistory))
      setTermListHistory(nextHistory)
    },
    [setTermListHistory, termListHistory],
  )

  return {
    saveTermFromHistory,
    removeTermFromHistory,
  }
}

export default useSearchHistory
