import { container } from 'tsyringe'

import './providers'

import { TransactionsRepositoryMethods } from '@modules/transactions/repositories/TransactionsRepositoryMethods'
import { TransactionsRepository } from '@modules/transactions/infra/prisma/repositories/TransactionsRepository'

container.registerInstance<TransactionsRepositoryMethods>('TransactionsRepository', new TransactionsRepository())
