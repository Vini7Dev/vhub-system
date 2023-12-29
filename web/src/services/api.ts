import axios from 'axios'

export enum TransactionOrigin {
  'Bradesco-CP/CC' = 0,
  'NuBank-CreditCard' = 1,
}

export interface TransactionProps {
  id: number
  date: string
  value: number
  description: string
  origin_type: TransactionOrigin
  created_at: string
}

interface ApiGetTransactionsProps {
  originType: TransactionOrigin
  startDate: string
  endDate: string
}

export const api = axios.create({
  baseURL: 'http://localhost:3333/v1',
})

export const apiGetTransactions = async ({
  startDate = '2023-01-01',
  endDate = '2023-12-31',
  originType = 0,
}: ApiGetTransactionsProps) => {
  return api.get<TransactionProps[]>(`/transactions?startDate=${startDate}&endDate=${endDate}&originType=${originType}`)
}
