import { Transaction } from '@prisma/client'

export { Transaction }

export enum TransactionOrigin {
  'Bradesco-CP/CC' = 0,
  'NuBank-CreditCard' = 1,
}
