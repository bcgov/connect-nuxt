export const useConnectTombstone = (stateKey: string, initialState?: Partial<ConnectTombstoneState>) => {
  function createInitialState(): ConnectTombstoneState {
    const baseState: ConnectTombstoneState = {
      loading: false,
      title: {} as ConnectTombstoneTitle,
      subtitles: [],
      details: [],
      sideDetails: [],
      bottomButtons: []
    }

    return { ...baseState, ...initialState }
  }

  const tombstone = useState<ConnectTombstoneState>(stateKey, () => createInitialState())

  function $reset() {
    tombstone.value = createInitialState()
  }

  return { tombstone, $reset }
}
