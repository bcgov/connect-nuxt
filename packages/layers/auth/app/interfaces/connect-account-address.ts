export type ConnectAccountAddress = Pick<ConnectAddress, Exclude<keyof ConnectAddress, 'locationDescription'>>
