export interface ConnectTax {
  gst: number
  pst: number
}

export interface ConnectFeeItem {
  filingFees: number
  filingType: string
  filingTypeCode: string
  futureEffectiveFees: number
  priorityFees: number
  processingFees: number
  serviceFees: number
  tax: ConnectTax
  total: number
  label?: string
  isPlaceholder?: boolean
  quantity?: number
  quantityDesc?: string
  waived?: boolean
}

export interface ConnectFeeOptions {
  showAllActiveFees?: boolean
  showFutureEffectiveFee?: boolean
  showPriorityFee?: boolean
  showProcessingFee?: boolean
  showGst?: boolean
  showPst?: boolean
  showServiceFee?: boolean
}

export interface ConnectFees { // this could have multiple mapped feeItems
  [key: string]: ConnectFeeItem
}
