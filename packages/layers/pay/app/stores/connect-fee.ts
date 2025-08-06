export const useConnectFeeStore = defineStore('connect-pay-fee-store', () => {
  const { $payApi } = useNuxtApp()
  const { t } = useI18n()
  const { baseModal } = useConnectModal()

  const defaultFeeOptions = {
    showFutureEffectiveFee: false,
    showPriorityFee: false,
    showProcessingFee: false,
    showGst: false,
    showPst: false,
    showServiceFee: true
  }
  const feeOptions = ref<ConnectFeeOptions>(defaultFeeOptions)

  const fees = ref<ConnectFees>({})
  const feesCached = ref<ConnectFees>({})

  const defaultPlaceholder = {
    isPlaceholder: true,
    filingFees: 0,
    filingType: 'placeholder',
    filingTypeCode: 'PLACEHOLDER',
    futureEffectiveFees: 0,
    label: '',
    priorityFees: 0,
    processingFees: 0,
    serviceFees: 0,
    tax: {
      gst: 0,
      pst: 0
    },
    total: 0
  }
  const placeholderFeeItem = ref<ConnectFeeItem>(defaultPlaceholder)

  const initFees = async (
    feeCodes: { code: string, entityType: string, label: string, quantityDesc?: string }[],
    placeholder: { label: string, matchServiceFeeToCode?: string },
    options?: ConnectFeeOptions
  ) => {
    // Get all the fee information for each fee code from the pay api
    const feePromises = []
    for (const feeInfo of feeCodes) {
      feePromises.push(getFee(feeInfo.entityType, feeInfo.code))
    }
    const feesResolved = (await Promise.all(feePromises)).filter(fee => !!fee)

    // Add all fee information for each code to the store
    feesCached.value = feesResolved.reduce((reducedFees, fee) => {
      return {
        ...reducedFees,
        [fee.filingTypeCode]: {
          ...fee,
          label: (feeCodes.find(feeInfo => feeInfo.code === fee.filingTypeCode))?.label,
          quantityDesc: (feeCodes.find(feeInfo => feeInfo.code === fee.filingTypeCode))?.quantityDesc
        }
      }
    }, feesCached.value)

    // set the placeholder values
    placeholderFeeItem.value.label = placeholder.label
    if (placeholder.matchServiceFeeToCode) {
      placeholderFeeItem.value.serviceFees = feesCached.value[placeholder.matchServiceFeeToCode]?.serviceFees || 0
    }

    // set fee options
    if (options) {
      feeOptions.value = {
        ...feeOptions.value,
        ...options
      }
    }
  }

  const getTotalFromFees = (feeValue: string, isTax = false) => {
    let total = 0
    for (const key of Object.keys(fees.value)) {
      if (fees.value[key]?.waived) {
        // if waived then total value for is 0
        continue
      }
      const quantity = fees.value[key]?.quantity ?? 1
      // @ts-expect-error - string cant index
      if (isTax && fees.value[key].tax[feeValue]) {
        // @ts-expect-error - string cant index
        total += fees.value[key].tax[feeValue] * quantity
        // @ts-expect-error - string cant index
      } else if (fees.value[key][feeValue]) {
        if (feeValue === 'total') {
          // @ts-expect-error - string cant index
          // ignore service fee and processing fee
          // - (otherwise incorrectly adding it for each item instead of once at the end)
          total += (fees.value[key].total - fees.value[key].serviceFees - fees.value[key].processingFees) * quantity
        } else {
          // @ts-expect-error - string cant index
          total += fees.value[key][feeValue] * quantity
        }
      }
    }
    return total
  }

  const getMaxFromFees = (feeValue: string) => {
    let maxFee = 0
    for (const key of Object.keys(fees.value)) {
      // @ts-expect-error - string cant index
      const itemFee = fees.value[key][feeValue]
      if (itemFee && (itemFee > maxFee)) {
        maxFee = itemFee
      }
    }
    return maxFee
  }

  const totalFutureEffectiveFees = computed(() => getTotalFromFees('futureEffectiveFees'))
  const totalPriorityFees = computed(() => getTotalFromFees('priorityFees'))
  const totalProcessingFees = computed(() => getMaxFromFees('processingFees'))
  const totalServiceFees = computed(() => getMaxFromFees('serviceFees'))
  const totalGst = computed(() => getTotalFromFees('gst', true))
  const totalPst = computed(() => getTotalFromFees('pst', true))
  const total = computed(() => getTotalFromFees('total') + totalServiceFees.value + totalProcessingFees.value)

  /**
   * Fetches the Fee info for the given entity type / fee code combination.
   *
   * @returns {Promise<Fee | undefined>} Fee data or undefined if an error occurs.
   */
  const getFee = async (
    entityType: string,
    code: string
  ): Promise<ConnectFeeItem | undefined> => {
    try {
      const params = {
        priority: true,
        futureEffective: true
      }
      return await $payApi<ConnectFeeItem>(`/fees/${entityType}/${code}`, { params })
    } catch (error) {
      console.error('Error fetching Fee: ', error)
    }
  }

  const addReplaceFee = (
    code: string,
    options?: {
      futureEffective?: boolean
      priority?: boolean
      quantity?: number
      quantityDesc?: string
      waived?: boolean
    }
  ) => {
    const fee = feesCached.value?.[code]
    if (fee) {
      const futureEffectiveFee = options?.futureEffective ? fee.futureEffectiveFees : 0
      const priorityFee = options?.priority ? fee.priorityFees : 0
      const total = fee.total - (fee.futureEffectiveFees - futureEffectiveFee) - (fee.priorityFees - priorityFee)
      const extraFees = {
        futureEffectiveFees: options?.futureEffective ? fee.futureEffectiveFees : 0,
        priorityFees: options?.priority ? fee.priorityFees : 0,
        total
      }
      fees.value[code] = {
        ...fee,
        ...extraFees,
        ...(options || {})
      }
      return
    }
    console.error(`Error adding ${code}. Please use initFees to initialize this fee code before adding it.`)
  }

  const removeFee = (code: string) => {
    /* eslint-disable-next-line */
    delete fees.value[code]
  }

  // alternate payment option stuff
  const PAD_PENDING_STATES = [ConnectPayCfsStatus.PENDING, ConnectPayCfsStatus.PENDING_PAD_ACTIVATION]
  const userPaymentAccount = shallowRef<ConnectPayAccount>({} as ConnectPayAccount)
  const userSelectedPaymentMethod = ref<ConnectPayMethod>(ConnectPayMethod.DIRECT_PAY)
  const allowAlternatePaymentMethod = ref<boolean>(false)
  const allowedPaymentMethods = ref<{ label: string, value: ConnectPayMethod }[]>([])

  watch(userSelectedPaymentMethod, () => {
    // if pad in confirmation period then set selected payment to CC
    if (PAD_PENDING_STATES.includes(userPaymentAccount.value?.cfsAccount?.status)) {
      userSelectedPaymentMethod.value = ConnectPayMethod.DIRECT_PAY
      // show modal for user
      baseModal.open({
        title: t('connect.label.padAccountInConfirmationPeriod'),
        description: t('connect.text.padAccountInConfirmationPeriod'),
        dismissible: true,
        buttons: [
          { label: t('connect.label.close'), variant: 'outline', shouldClose: true }
        ]
      })
    }
  })

  const $resetAlternatePayOptions = () => {
    userPaymentAccount.value = {} as ConnectPayAccount
    userSelectedPaymentMethod.value = ConnectPayMethod.DIRECT_PAY
    allowAlternatePaymentMethod.value = false
    allowedPaymentMethods.value = []
  }

  const initAlternatePaymentMethod = async () => {
    $resetAlternatePayOptions()
    const accountId = useConnectAccountStore().currentAccount.id
    try {
      // get payment account
      const res = await $payApi<ConnectPayAccount>(`/accounts/${accountId}`)
      userPaymentAccount.value = res

      // add options to allowedPaymentMethods
      let defaultMethod = userPaymentAccount.value.paymentMethod
      if (defaultMethod !== undefined) {
        const accountNum = userPaymentAccount.value.cfsAccount?.bankAccountNumber ?? ''
        allowedPaymentMethods.value.push({
          label: t(`connect.payMethod.label.${defaultMethod}`, { account: accountNum }),
          value: defaultMethod
        })

        // only add direct pay if not default option
        if (defaultMethod !== ConnectPayMethod.DIRECT_PAY) {
          allowedPaymentMethods.value.push({
            label: t(`connect.payMethod.label.${ConnectPayMethod.DIRECT_PAY}`),
            value: ConnectPayMethod.DIRECT_PAY
          })
          // if pad in confirmation period then set default payment to CC
          if (PAD_PENDING_STATES.includes(res.cfsAccount?.status)) {
            defaultMethod = ConnectPayMethod.DIRECT_PAY
          }
        }
      }
      userSelectedPaymentMethod.value = defaultMethod

      // only set allowed flag to true if previous steps didnt cause an error
      allowAlternatePaymentMethod.value = true
    } catch (e) {
      logFetchError(e, 'Error initializing user payment account')
    }
  }

  const $reset = () => {
    feeOptions.value = defaultFeeOptions
    fees.value = {}
    placeholderFeeItem.value = defaultPlaceholder
    $resetAlternatePayOptions()
  }

  return {
    feeOptions,
    fees,
    placeholderFeeItem,
    totalFutureEffectiveFees,
    totalPriorityFees,
    totalProcessingFees,
    totalGst,
    totalPst,
    totalServiceFees,
    total,
    initFees,
    addReplaceFee,
    removeFee,
    initAlternatePaymentMethod,
    userPaymentAccount,
    userSelectedPaymentMethod,
    allowedPaymentMethods,
    allowAlternatePaymentMethod,
    $reset
  }
})
