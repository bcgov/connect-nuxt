interface TombstoneState {
  loading: boolean
  title: ConnectTombstoneTitle
  subtitles: ConnectTombstoneItem[]
  details: ConnectTombstoneItem[]
  sideDetails: ConnectTombstoneSideDetail[]
  bottomButtons: ConnectTombstoneBtn[]
}

export const useConnectTombstone = (stateKey?: string) => {
  const key = stateKey ? `connect-tombstone-state-${stateKey}` : 'connect-tombstone-state'

  return useState<TombstoneState>(key, () => ({
    loading: false,
    title: {} as ConnectTombstoneTitle,
    subtitles: [],
    details: [],
    sideDetails: [],
    bottomButtons: []
  }))
}
