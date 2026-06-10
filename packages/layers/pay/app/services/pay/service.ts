import { getCachedOrFetch } from '../helpers'

export const useConnectPayService = () => {
  const query = useConnectPayQuery()

  /* GET Requests */

  async function getFee(
    entityType: string,
    code: string,
    params?: { priority?: boolean, futureEffective?: boolean },
    force = false
  ): Promise<ConnectFeeItem> {
    const options = query.feeOptions(entityType, code, params)
    return await getCachedOrFetch(options, force)
  }

  async function getPayAccount(
    accountId: string | number,
    force = false
  ): Promise<ConnectPayAccount> {
    const options = query.payAccountOptions(accountId)
    return await getCachedOrFetch(options, force)
  }

  return {
    getFee,
    getPayAccount
  }
}
