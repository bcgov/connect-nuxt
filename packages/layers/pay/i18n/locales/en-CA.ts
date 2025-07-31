/* eslint-disable max-len */
export default {
  connect: {
    label: {
      cad: 'CAD',
      exampleFee: 'Example Fee',
      exampleFeePriority: 'Priority Option Fee',
      exampleFeeFutureEffective: 'Future Effective Option Fee',
      examplePlaceholder: 'Example Placeholder',
      feeSummary: 'Fee Summary',
      futureEffectiveFee: 'Future Effective Fee',
      gst: 'GST',
      increaseQuantity: 'Increase Quantity',
      noFee: 'No Fee',
      priorityFee: 'Priority Fee',
      processingFee: 'Processing Fee',
      pst: 'PST',
      quantityDescriptor: 'Quantity Descriptor',
      serviceFee: 'Service Fee',
      toggleFee: 'Toggle Fee',
      toggleFutureEffective: 'Toggle Future Effective',
      togglePriority: 'Toggle Priority',
      totalFees: 'Total Fees'
    },
    payMethod: {
      // These are used dynamically with the ConnectPayMethod enum
      label: {
        DIRECT_PAY: 'Credit Card',
        PAD: 'Pre-authorized Debit (PAD) {account}',
        BCOL: 'Online Banking',
        JV: 'Journal Voucher',
        undefined: 'Default'
      },
      text: {
        DIRECT_PAY: 'Paying with Credit Card',
        PAD: 'Paying with Pre-authorized Debit (PAD) {account}',
        BCOL: 'Paying with Online Banking',
        JV: 'Paying with Journal Voucher',
        undefined: 'Paying with default method'
      }
    }
  }
}
