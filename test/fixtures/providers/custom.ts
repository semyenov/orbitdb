import type { IdentityProviderInstance } from '@orbitdb/core'

const type = 'custom'

async function verifyIdentity(data) {
  return true
}

function CustomIdentityProvider() {
  return async () => {
    const getId = () => 'custom'

    const signIdentity = data => `signature '${data}'`

    return {
      getId,
      signIdentity,
      type,
    } as IdentityProviderInstance
  }
}

CustomIdentityProvider.verifyIdentity = verifyIdentity
CustomIdentityProvider.type = type

export default CustomIdentityProvider
