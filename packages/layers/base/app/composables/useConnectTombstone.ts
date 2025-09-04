export const useConnectTombstone = (stateKey: string) => {

  function createInitialState (): ConnectTombstoneState {
    return ({
      loading: false,
      title: {} as ConnectTombstoneTitle,
      subtitles: [],
      details: [],
      sideDetails: [],
      bottomButtons: []
    })
  }

  const tombstone = useState<ConnectTombstoneState>(stateKey, () => createInitialState())

  function $reset() {
    tombstone.value = createInitialState()
  }

  return { tombstone, $reset }
}
