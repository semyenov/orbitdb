import { Identities } from '../packages/orbitdb'

import { logger } from './logger'

export const identities = await Identities({
  path: './identities',
})

export const userA = await identities.createIdentity({ id: 'userA' })
export const userB = await identities.createIdentity({ id: 'userB' })

logger.log('userA', userA.id)
logger.log('userB', userB.id)
