const type = 'fake'

async function verifyIdentity(_data) {
  return false
}

function FakeIdentityProvider() {
  return async () => {
    const getId = () => 'pubKey'

    const signIdentity = data => `false signature '${data}'`

    return {
      getId,
      signIdentity,
      type,
    }
  }
}

FakeIdentityProvider.verifyIdentity = verifyIdentity
FakeIdentityProvider.type = type

export default FakeIdentityProvider
