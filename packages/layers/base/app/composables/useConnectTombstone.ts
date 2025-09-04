interface TombstoneState {
  loading: boolean
  title: ConnectTombstoneTitle
  subtitles: ConnectTombstoneItem[]
  details: ConnectTombstoneItem[]
  sideDetails: ConnectTombstoneSideDetail[]
  bottomButtons: ConnectTombstoneBtn[]
}

export const useConnectTombstone = (stateKey: string) => {

  function createInitialState (): TombstoneState {
    return ({
      loading: false,
      title: {} as ConnectTombstoneTitle,
      subtitles: [],
      details: [],
      sideDetails: [],
      bottomButtons: []
    })
  }

  const tombstone = useState<TombstoneState>(stateKey, () => createInitialState())

  function $reset() {
    tombstone.value = createInitialState()
  }

  return { tombstone, $reset }
}
