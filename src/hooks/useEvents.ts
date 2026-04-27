'use client'

import { IEvent } from '@src/models/interfaces'
import { useEffect, useState, useCallback } from 'react'
import { useDebounce } from './useDebounce'

export function useEvents(type: string, endpoint: string = '/api/admin/events') {
  const [events, setEvents] = useState<IEvent[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const debouncedSearch = useDebounce(search, 300)

  const loadEvents = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `${endpoint}?type=${type}&search=${debouncedSearch}`
      )
      const data = await res.json()
      setEvents(data.events)
    } catch (err) {
      console.error(`Failed loading ${type} events`, err)
    } finally {
      setLoading(false)
    }
  }, [type, debouncedSearch])

  useEffect(() => {
    loadEvents()
  }, [loadEvents])

  return {
    events,
    loading,
    search,
    setSearch,
    reload: loadEvents,
  }
}