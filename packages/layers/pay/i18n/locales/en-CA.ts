/* eslint-disable max-len */
export default {
  connect: {
    label: {
      cad: 'CAD',
      close: 'Close',
      feeSummary: 'Fee Summary',
      futureEffectiveFee: 'Future Effective Fee',
      gst: 'GST',
      noFee: 'No Fee',
      priorityFee: 'Priority Fee',
      processingFee: 'Processing Fee',
      pst: 'PST',
      serviceFee: 'Service Fee',
      totalFees: 'Total Fees',
      padAccountInConfirmationPeriod: 'PAD Account in Confirmation Period'
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
        EJV: 'Paying with Electronic Journal Voucher',
        ONLINE_BANKING: 'Paying with Online Banking',
        PAD: 'Paying with Pre-authorized Debit (PAD) {account}',
        undefined: 'Paying with default method'
      }
    },
    text: {
      padAccountInConfirmationPeriod: 'This account will not be able to perform any PAD transactions until the mandatory (3) day confirmation period has ended. Until then you may continue to pay using credit card.'
    }
  }
}
