/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref, type Ref } from 'vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useConnectTombstone } from '../../../app/composables/useConnectTombstone'

const stateMap = new Map<string, Ref<any>>()

mockNuxtImport('useState', () => {
  return vi.fn((key: string, init: () => any) => {
    if (!stateMap.has(key)) {
      stateMap.set(key, ref(init()))
    }
    return stateMap.get(key)
  })
})

describe('useConnectTombstone', () => {
  beforeEach(() => {
    stateMap.clear()
  })

  it('should initialize with the correct default state', () => {
    const { tombstone } = useConnectTombstone('test-key-1')

    expect(tombstone.value).toEqual({
      loading: false,
      title: {},
      subtitles: [],
      details: [],
      sideDetails: [],
      bottomButtons: []
    })
  })

  it('should initialize with a custom default state', () => {
    const customInitialState = {
      loading: true,
      title: { text: 'Initial Title', as: 'span' }
    }

    const { tombstone } = useConnectTombstone('custom-key', customInitialState)

    expect(tombstone.value.loading).toBe(true)
    expect(tombstone.value.title.text).toBe('Initial Title')
    expect(tombstone.value.details).toEqual([])
  })

  it('should return the same state with the same key', () => {
    const instance1 = useConnectTombstone('shared-key')
    const instance2 = useConnectTombstone('shared-key')

    expect(instance1.tombstone).toBe(instance2.tombstone)

    instance1.tombstone.value.loading = true
    instance1.tombstone.value.title = { text: 'Shared Title', as: 'span' }

    expect(instance2.tombstone.value.loading).toBe(true)
    expect(instance2.tombstone.value.title.text).toBe('Shared Title')
  })

  it('should return different states for different keys', () => {
    const { tombstone: tombstoneA } = useConnectTombstone('key-A')
    const { tombstone: tombstoneB } = useConnectTombstone('key-B')

    expect(tombstoneA).not.toBe(tombstoneB)

    tombstoneA.value.loading = true

    expect(tombstoneB.value.loading).toBe(false)
  })

  it('should reset the state to its initial value when $reset is called', () => {
    const { tombstone, $reset } = useConnectTombstone('reset-key')
    tombstone.value.loading = true
    tombstone.value.title = { text: 'Some Title', as: 'span' }
    tombstone.value.details = [{ text: 'Some Detail' }]

    $reset()

    expect(tombstone.value).toEqual({
      loading: false,
      title: {},
      subtitles: [],
      details: [],
      sideDetails: [],
      bottomButtons: []
    })
  })

  it('should reset to the custom default state when $reset is called', () => {
    const customInitialState = {
      loading: true,
      title: { text: 'Initial Title', as: 'span' }
    }

    const { tombstone, $reset } = useConnectTombstone('custom-reset-key', customInitialState)

    expect(tombstone.value.loading).toBe(true)
    expect(tombstone.value.title.text).toBe('Initial Title')

    tombstone.value.loading = false
    tombstone.value.title = { text: 'A Different Title', as: 'span' }

    expect(tombstone.value.loading).toBe(false)
    expect(tombstone.value.title.text).toBe('A Different Title')

    $reset()

    expect(tombstone.value.loading).toBe(true)
    expect(tombstone.value.title.text).toBe('Initial Title')
  })
})
