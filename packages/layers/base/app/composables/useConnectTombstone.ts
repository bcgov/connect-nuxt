interface TombstoneState {
  loading: boolean
  title: ConnectTombstoneTitle
  subtitles: ConnectTombstoneItem[]
  details: ConnectTombstoneItem[]
  sideDetails: ConnectTombstoneSideDetail[]
  bottomButtons: ConnectTombstoneBtn[]
}

export const useConnectTombstone = (stateKey: string) => {
  return useState<TombstoneState>(stateKey, () => ({
    loading: false,
    title: {} as ConnectTombstoneTitle,
    subtitles: [],
    details: [],
    sideDetails: [],
    bottomButtons: []
  }))
}
