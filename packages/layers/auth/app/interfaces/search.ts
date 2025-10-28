export interface Facet {
  count: number
  parentCount?: number
  value: string
  selected?: boolean
}

export interface FacetsResult {
  fields?: {
    entityType?: Facet[]
    legalType?: Facet[]
    relatedEntityType?: Facet[]
    relatedLegalType?: Facet[]
    relatedState?: Facet[]
    roleType?: Facet[]
    status?: Facet[]
    state?: Facet[]
  }
}

export interface BusinessSearchPayload {
  query: {
    value?: string
    name?: string
    identifier?: string
    bn?: string
    parties?: { partyName: string }
  }
  categories: {
    status?: string[]
    legalType?: string[]
  }
  rows?: number
  start?: number
}

export interface BusinessSearchResult {
  name: string
  identifier: string
  status: string
  legalType: string
  bn?: string
  goodStanding?: boolean
  modernized?: boolean
}

export interface BusinessSearchResponse {
  facets?: FacetsResult
  searchResults: {
    queryInfo: BusinessSearchPayload
    results: BusinessSearchResult[]
    totalResults: number
  }
}
