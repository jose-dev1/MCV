const createErrorFactory = function (name) {
  return class BusinessError extends Error {
    constructor (message) {
      super(message)
      this.name = name
    }
  }
}

export const ConnectionError = createErrorFactory('ConnectionError')
export const NotFoundUser = createErrorFactory('User not found')
export const InvalidCredential = createErrorFactory('invalid Credential')
