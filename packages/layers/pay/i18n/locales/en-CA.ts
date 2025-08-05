/* eslint-disable max-len */
export default {
  connect: {
    label: {
      cad: 'CAD',
      feeSummary: 'Fee Summary',
      futureEffectiveFee: 'Future Effective Fee',
      gst: 'GST',
      noFee: 'No Fee',
      priorityFee: 'Priority Fee',
      processingFee: 'Processing Fee',
      pst: 'PST',
      serviceFee: 'Service Fee',
      totalFees: 'Total Fees'
    },
    payMethod: {
      // These are used dynamically with the ConnectPayMethod enum
      label: {
        BCOL: 'BC Online Account',
        DIRECT_PAY: 'Credit Card',
        EFT: 'Electronic Funds Transfer',
        EJV: 'Electronic Journal Voucher',
        ONLINE_BANKING: 'Online Banking',
        PAD: 'Pre-authorized Debit (PAD) {account}',
        undefined: 'Default'
      },
      text: {
        BCOL: 'Paying with BC Online Account',
        DIRECT_PAY: 'Paying with Credit Card',
        EFT: 'Paying with Electronic Funds Transfer',
        EJV: 'Paying with Electornic Journal Voucher',
        ONLINE_BANKING: 'Paying with Online Banking',
        PAD: 'Paying with Pre-authorized Debit (PAD) {account}',
        undefined: 'Paying with default method'
      }
    }
  }
}
